<?php

namespace App\Http\Controllers;

use App\Models\Helper;
use http\Env\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class HelperController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'fullName' => 'required | max:255',
            'email' => 'required | max:255',
            'phone_number' => 'required | digits:10',
            'person_type' => 'required | max:255',
            'help_type' => 'required | max:255',
            'message' => 'required',
        ]);

        if ($validator->fails())
        {
            return response()->json([
                'success' => false,
                'errors' => $validator->messages(),
            ]);
        }

        $helper = new Helper($request->all());
        $helper->save();
        return response()->json([
            'success' => true,
            'message' => 'Helper successfully added',
        ]);
    }

    public function get_helpers(): JsonResponse
    {
        $helpers = Helper::all();

        if ($helpers->isEmpty()) {
            return response()->json([
                'success' => false,
            ]);
        }

        return response()->json([
            'success' => true,
            'helpers' => $helpers,
        ]);
    }
}
