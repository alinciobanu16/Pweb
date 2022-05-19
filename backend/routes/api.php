<?php

use App\Http\Controllers\HelperController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/public', function () {
    return response()->json([
        'message' => 'Hello from a public endpoint! You don\'t need to be authenticated to see this.',
        'authorized' => Auth::check(),
        'user' => Auth::check() ? json_decode(json_encode((array) Auth::user(), JSON_THROW_ON_ERROR), true) : null,
    ], 200, [], JSON_PRETTY_PRINT);
})->middleware(['auth0.authorize.optional']);

Route::get('/private', function () {
    return response()->json([
        'message' => 'Hello from a private endpoint! You need to be authenticated to see this.',
    ], 200, [], JSON_PRETTY_PRINT);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

//Route::get('/send-email', function () {
//    $connection = new AMQPStreamConnection('rabbitmq', 5672, 'guest', 'guest');
//    $channel = $connection->channel();
//    $channel->queue_declare('task_queue', false, true, false, false);
//    $data = "Hello world";
//    if (empty($data)) {
//        $data = "Hello World!";
//    }
//    $msg = new AMQPMessage(
//        $data,
//        array('delivery_mode' => AMQPMessage::DELIVERY_MODE_PERSISTENT)
//    );
//
//    $channel->basic_publish($msg, '', 'task_queue');
//
//    echo ' [x] Sent ', $data, "\n";
//
//    $channel->close();
//    $connection->close();
//});
Route::post('/send-email', [UserController::class, 'sendEmail']);

Route::group(['middleware' => ['auth0.authorize']], function () {
    Route::post('/save-user', [UserController::class, 'store']);
    Route::post('/check-user', [UserController::class, 'check_user']);
    Route::post('/helper', [HelperController::class, 'store']);
    Route::get('/helper', [HelperController::class, 'get_helpers']);
});

