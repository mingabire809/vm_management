<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VM;
use Inertia\Inertia;

class VMController extends Controller
{
    public function create()
    {
        return Inertia::render('VM/Create');
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $data = $request->validate([
            'name' => 'required|string',
            'storage' => 'required|integer',
            'ram' => 'required|integer',
            'processor' => 'required|string'
        ]);

        VM::create([
            'name' => $data['name'],
            'storage' => $data['storage'],
            'ram' => $data['ram'],
            'processor' => $data['processor'],
            'user_id' => $user->id,
            'status' => 'active'

        ]);

        return redirect()->route('dashboard')->with('success', 'VM created successfully');


    }

    public function show($vm)
    {
        $user = auth()->user();
        $virtual = $user->vm()->findOrFail($vm);

        return Inertia::render('VM/Show', [
            'virtual' => $virtual
        ]);
    }

    public function update($vm)
    {
        
    }

    public function delete($vm)
    {
        $user = auth()->user();
        $virtual = $user->vm()->findOrFail($vm);

        $virtual->delete();

        return redirect()->route('dashboard')->with('success', 'VM deleted successfully');
    }
}
