<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'name' => 'required|min:3',
                'email' => 'required|email|unique:users,email',
                'username' => 'required|min:5|unique:users,username',
                'phone' => 'required|regex:/(628)[0-9]{9}/|unique:users,phone',
                'password' => 'required|min:6'
            ], [
                'name.required' => 'Nama tidak boleh kosong',
                'name.min' => 'Minimal panjang name 3 karakter',
                'email.required' => 'Email tidak boleh kosong',
                'email.email' => 'Format email tidak valid',
                'email.unique' => 'Email telah terdaftar',
                'phone.required' => 'Nomor telepon tidak boleh kosong',
                'phone.unique' => 'Nomor telepon telah terdaftar',
                'phone.regex' => 'Nomor telepon tidak valid',
                'username.required' => 'Username tidak boleh kosong',
                'username.min' => 'Minimal panjang username 5 karakter',
                'username.unique' => 'Username telah terdaftar',
                'password.required' => 'Password tidak boleh kosong',
                'password.min' => 'Minimal panjang password 6 karakter'
            ]);
            if ($validator->fails()) foreach ($validator->errors()->messages() as $key => $msg) throw new \Exception($msg[0]);

            DB::beginTransaction();

            $user = new User();
            $user->name = $request->name;
            $user->email = $request->email;
            $user->username = $request->username;
            $user->phone = $request->phone;
            $user->password = Hash::make($request->password);
            $user->save();

            DB::commit();
            return response()->json(['data' => $user]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request) {
        try {
            $validator = Validator::make($request->all(), [
                'username' => 'required',
                'password' => 'required'
            ], [
                'username.required' => 'Username tidak boleh kosong',
                'password.required' => 'Password tidak boleh kosong'
            ]);
            if ($validator->fails()) foreach ($validator->errors()->messages() as $key => $msg) throw new \Exception($msg[0]);

            $user = User::where('username', $request->username)->first();
            if (!$user || !Hash::check($request->password, $user->password)) {
                throw new \Exception('Password tidak benar');
            }

            $token = $user->createToken($request->username)->plainTextToken;

            return response()->json([
                'data' => ['user' => $user, 'token' => $token]
            ]);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}
