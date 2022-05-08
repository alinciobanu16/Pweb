<?php

namespace App\Http\Controllers;

use App\Models\User;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

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
}
