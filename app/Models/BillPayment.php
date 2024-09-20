<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use OwenIt\Auditing\Contracts\Auditable;

class BillPayment extends Model implements Auditable
{
    use HasFactory;
    use \OwenIt\Auditing\Auditable;

    protected $fillable = ['user_id', 'amount'];
    protected $auditInclude = [
        'user_id',
        'amount',
    ];

    public function user(){
        return $this->belongsTo(User::class);
    }
}
