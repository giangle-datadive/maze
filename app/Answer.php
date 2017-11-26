<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $guarded = ['id'];

    protected $casts = [
        'is_correct' => 'boolean'
    ];
}
