<?php

namespace App\Http\Controllers;

use App\Models\User;
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
}
