<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\VM;
use App\Models\Backup;
use App\Models\BackUpPricing;
use App\Models\Billing;
use Inertia\Inertia;
use Carbon\Carbon;

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
            'virtual' => $virtual,
            'backup' => $virtual->backup
        ]);
    }

    public function status_update(Request $request, $vm)
    {
        $user = auth()->user();
        $virtual = $user->vm()->findOrFail($vm);

        $virtual->update([
            'status' => $request->status
        ]);

        if($request->status=='active'){
            return redirect()->back()->with('success', 'VM resumed successfully');
        }else{
            return redirect()->back()->with('success', 'VM suspended successfully successfully');
        }
    }

    public function update(Request $request, $vm)
    {
        $user = auth()->user();
        $virtual = $user->vm()->findOrFail($vm);

        $data = $request->only(['storage', 'ram', 'processor']);
    
        $data = array_filter($data, function($value) {
            return !is_null($value);
        });


        $virtual->update($data);

        return redirect()->back()->with('success', 'Changes applied successfully');
    }

    public function delete($vm)
    {
        $user = auth()->user();
        $virtual = $user->vm()->findOrFail($vm);

        $virtual->delete();

        return redirect()->route('dashboard')->with('success', 'VM deleted successfully');
    }

    public function backup_creation(Request $request, $vm)
    {
        $user = auth()->user();
        $virtual = $user->vm()->findOrFail($vm);

        $now = Carbon::now();
        $backup = Backup::create([
            'user_id' => $user->id,
            'vm_id' => $virtual->id,
            'backup_name' => $virtual->name . $now .$user->name,
            'path' => '/backup/'.$user->name
        ]);

        $cost = (int)$virtual->storage * 10;

        BackUpPricing::create([
            'user_id' => $user->id,
            'backup_id' => $backup->id,
            'cost' => $cost
        ]);

        $bill = $user->billing;
        $now = Carbon::now();
        
        if($bill){
            if($bill->status=='paid'){
                $bill->update([
                    'bill' => (int)$bill->bill + $cost,
                    'due_date' => $now->copy()->addDays(30),
                    'status' => 'unpaid'
                ]);
            }else{
                $bill->update([
                    'bill' => (int)$bill->bill + $cost
                ]);
            }
            
        }else{
            Billing::create([
                'user_id' => $user->id,
                'bill' => $cost,
                'due_date' => $now->copy()->addDays(30),
                'status' => 'unpaid'
            ]);
        }

        return redirect()->back()->with('success', 'Backup completed successfully');

        
    }
}
