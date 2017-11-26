<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function all()
    {
        $questions = Question::all();
        $questionIds = (clone $questions)->pluck('id')->toArray();
        $answers = Answer::whereIn('question_id', $questionIds)->get();

        return response()->json(compact('questions', 'answers'));
    }

    public function store(Request $request)
    {
        $this->validate($request, $this->getRule());
        $question = Question::create($request->only(['content', 'square_index']));
        foreach ($request->get('answers') as $answer) {
            $answers[] = $question->answers()->create($answer);
        }

        return response()->json(compact('question', 'answers'));
    }

    private function getRule()
    {
        return [
            'content' => 'required',
            'answers.*.content' => 'required',
            'square_index' => 'required|unique:questions, square_index'
        ];
    }
}
