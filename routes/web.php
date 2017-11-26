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

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('question/all', 'QuestionController@all');
Route::get('{squareIndex}/question/create', function () {
    return view('welcome');
});
Route::get('{squareIndex}/question/{edit}/edit', function () {
    return view('welcome');
});

Route::post('question', 'QuestionController@store');
Route::put('question/{id}', 'QuestionController@update');
