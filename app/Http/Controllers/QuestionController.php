<?php

namespace App\Http\Controllers;

use App\Answer;
use App\Question;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function index()
    {
        return view('welcome');
    }

    public function all()
    {
        $questions = Question::all();
        $questionIds = (clone $questions)->pluck('id')->toArray();
        $answers = Answer::whereIn('question_id', $questionIds)->get();
        $squares = file_get_contents(config_path('square.json'));
        $squares = json_decode($squares);

        return response()->json(compact('questions', 'answers', 'squares'));
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

    public function update(Request $request, $id)
    {
        $question = Question::findOrFail($id);
        $this->validate($request, $this->getRule());
        $question->update($request->only(['content']));
        $question->answers()->delete();
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
            'square_index' => 'required'
        ];
    }

    public function destroy($id)
    {
        $question = Question::findOrFail($id);
        $question->answers()->delete();
        $question->delete();

        return response()->json([]);
    }

    public function square(Request $request)
    {
        $this->validate($request, [
            'squares' => 'array',
            'squares.*' => 'required',
        ]);
        $squares = $request->get('squares');
        sort($squares);

        file_put_contents(config_path('square.json'), json_encode($squares));
    }
}
