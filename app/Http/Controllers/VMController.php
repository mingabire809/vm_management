<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class VMController extends Controller
{
    public function create()
    {
        return Inertia::render('VM/Create');
    }

    public function store()
    {
        
    }
}
