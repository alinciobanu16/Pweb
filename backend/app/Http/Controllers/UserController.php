<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;
use stdClass;

class UserController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required | max:255',
            'username' => 'required | max:255',
            'email' => ['required', 'email', Rule::unique('users', 'email')],
            'userType' => 'required'
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'success' => false,
                'errors' => $validator->messages(),
            ]);
        }

        $user = new User($request->all());
        $user->save();
        return response()->json([
            'success' => true,
            'message' => 'User successfully added',
        ]);
    }

    public function check_user(Request $request):JsonResponse
    {
        $name = $request->name;
        $email = $request->email;
        $user = User::all()->where('email', $email)->first();
        if ($user) {
            return response()->json([
                'success' => true,
                'userType' => $user->userType,
            ]);
        }

        return response()->json([
            'success' => false,
        ]);
    }

    public function sendEmail(Request $request): JsonResponse
    {
        $sendTo = $request['helpEmail'];
        $refName = $request['refName'];
        $refEmail = $request['refEmail'];
        $helpService = $request['helpService'];
        $refPhoneNumber = $request['refPhoneNumber'];

        $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');
        $channel = $connection->channel();
        $channel->queue_declare('task_queue', false, true, false, false);

        $data = new stdClass();
        $data->refEmail = $refEmail;
        $data->sendTo = $sendTo;
        $data->refName = $refName;
        $data->helpService = $helpService;
        $data->refPhoneNumber = $refPhoneNumber;
        $myJSON = json_encode($data);
        $data = $myJSON;

        if (empty($data)) {
            $data = "Hello World!";
        }
        $msg = new AMQPMessage(
            $data,
            array('delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT)
        );

        $channel->basic_publish($msg, '', 'task_queue');

        $channel->close();
        $connection->close();

        return response()->json([
            'success' => true,
        ]);
    }
}
