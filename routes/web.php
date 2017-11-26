<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();
Route::get('/', 'HomeController@index');
Route::get('/data', 'HomeController@data');


Route::group(['middleware' => 'auth'], function () {
    Route::get('/question', 'QuestionController@index');
    Route::get('question/all', 'QuestionController@all');
    Route::get('{squareIndex}/question/create', 'QuestionController@index');
    Route::get('{squareIndex}/question/{edit}/edit', 'QuestionController@index');
    Route::post('question', 'QuestionController@store');
    Route::post('square', 'QuestionController@square');
    Route::put('question/{id}', 'QuestionController@update');
    Route::delete('question/{id}', 'QuestionController@destroy');
});
