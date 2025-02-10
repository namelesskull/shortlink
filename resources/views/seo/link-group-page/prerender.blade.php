@extends('common::prerender.base')

@section('head')
    @include('seo.link-group-page.seo-tags')
@endsection

@section('body')
    <h1>{{ $linkeable->name }}</h1>
    <p>{{ $linkeable->description }}</p>

    @if ($image = $linkeable->image)
        <img src="{{ $image }}" alt="" />
    @endif

    <ul>
        @foreach ($linkeable->links as $link)
            <li>
                @if ($link->model_type === 'link')
                    <a href="{{ $link->short_url }}" target="_blank">
                        <div class="long-url">
                            <img
                                class="favicon-img"
                                src="{{ $link->image }}"
                                alt=""
                            />
                            <span>{{ $link->long_url }}</span>
                        </div>
                        <div class="short-url">{{ $link->short_url }}</div>
                        @if ($link->description)
                            <p class="link-description">
                                {{ $link->description }}
                            </p>
                        @endif
                    </a>
                @else
                    {{-- link widget --}}
                @endif
            </li>
        @endforeach
    </ul>
@endsection
