<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class Billing extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = ['user_id', 'bill', 'due_date', 'status'];

    protected $auditInclude = [
        'user_id',
        'bill',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
