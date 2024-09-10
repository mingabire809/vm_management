<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SocialId;
use App\Models\User;
use Exception;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Hash;

class GoogleController extends Controller
{
    public function  loginWithGoogle()
    {
        return Socialite::driver('google')->redirect();
    }

    public function callbackFromGoogle()
    {
        try {
            $user = Socialite::driver('google')->user();
        $social_id = SocialId::where('social_id', $user->getId())->first();

        if(!$social_id){
            $existingUser = User::where('email', $user->getEmail())->first();
            
            if($existingUser){
                return Inertia::render('Auth/Login', [
                    'flash' => [
                        'error' => 'Email already taken',
                        'success' => null,
                    ],
                ]);
            }

            $new_user = User::firstOrCreate([
                'name' => $user->getName(),
                'email' => $user->getEmail(),
                'email_verified_at' => now(),
                'password' => Hash::make(Str::random(8)),
            ]);

            SocialId::firstOrCreate([
                'social_id' => $user->getId(),
                'user_id' => $new_user->id
            ]);
            Auth::login($new_user);
            return redirect('dashboard');

        }else{
            $existingUser = User::findOrFail($social_id->user_id);
                Auth::login($existingUser);
                return redirect('dashboard');
        }
        } catch (\Throwable $th) {
            throw $th;
        }
    }
}
