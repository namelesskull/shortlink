@extends('common::prerender.base')

@section('head')
    @include('seo.link-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $linkeable->name }}</h1>
    <p>{{ $linkeable->description }}</p>

    @if ($image = $linkeable->image)
        <img src="{{ $image }}" alt="" />
    @endif

    @if ($linkeable->type === 'page' && $linkeable->custom_page)
        <article>
            {!! $linkeable->custom_page['body'] !!}
        </article>
    @elseif ($linkeable->type === 'overlay' && $linkeable->overlay)
        <section>
            <div class="message">{{ $linkeable->overlay['message'] }}</div>
            @if ($btnText = $linkeable->overlay['btn_text'])
                <a
                    class="main-button"
                    href="{{ $linkeable->overlay['btn_link'] }}"
                >
                    {{ $btnText }}
                </a>
            @endif

            <div class="ribbon-wrapper">
                <div class="ribbon">{{ $linkeable->overlay['label'] }}</div>
            </div>
        </section>
    @endif

    <a href="{{ $linkeable->long_url }}">
        {{ __('Go to Link') }}
    </a>
@endsection
