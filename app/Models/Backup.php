<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Backup extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;
    protected $fillable = ['user_id', 'vm_id', 'backup_name', 'path'];

    protected $auditInclude = [
        'user_id',
        'vm_id',
        'backup_name'
    ];

    public function vm(){
        return $this->belongsTo(VM::class);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    
}
