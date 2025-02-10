@extends('common::framework')

@if ($linkeable = $pageData['linkeable'] ?? null)
    @foreach ($linkeable->pixels as $pixel)
        @include("pixels.{$pixel->type}", ['pixel' => $pixel])
    @endforeach
@endif
