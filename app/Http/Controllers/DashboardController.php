<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $vm = $user->vm;
        return Inertia::render('Dashboard', [
            'vm' => $vm
        ]);
    }

    
}
