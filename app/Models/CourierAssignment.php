<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class CourierAssignment extends Model
{
    use HasFactory;

    protected $table = "courierassignment";

    protected $fillable = [
        'orderid',
        'courierid',
    ];

    public function order(): HasOne
    {
        return $this->hasOne(Order::class, 'orderid');
    }

    public function courier(): HasOne
    {
        return $this->hasOne(User::class, 'courierid');
    }
}
