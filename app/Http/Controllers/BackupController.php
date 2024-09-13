<?php

namespace App\Http\Controllers;
use Inertia\Inertia;

use Illuminate\Http\Request;

class BackupController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $backup = $user->backup;

        return Inertia::render('Backup/Index', [
            'backups' => $backup,
        ]);
    }

    public function delete($backup)
    {
        $user = auth()->user();
        $data_backup = $user->backup()->findOrFail($backup);

        $data_backup->delete();

        return redirect()->back()->with('success', 'Backup deleted successfully');
    }
}
