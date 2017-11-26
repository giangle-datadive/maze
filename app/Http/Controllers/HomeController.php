<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('home');
    }

    public function data()
    {
        $questions = Question::all();
        $answers = Answer::all();
        $squares = json_decode(file_get_contents(config_path('square.json')));

        return response()->json(compact('questions', 'answers', 'squares'));
    }
}
