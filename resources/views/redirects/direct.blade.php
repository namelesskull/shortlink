<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta property="og:title" content="{{ $linkeable->name }}" />
        <meta
            property="og:description"
            content="{{ $linkeable->description }}"
        />
        @if ($image = $linkeable->image)
            <meta property="og:image" content="{{ $image }}" />
        @endif

        <title>{{ $linkeable->name }}</title>

        @foreach ($linkeable->pixels as $pixel)
            @include("pixels.$pixel->type", ['pixel' => $pixel])
        @endforeach

        @yield('head-end')

        <script>
            var timer = setTimeout(function () {
                window.location =
                    '{!! $linkeable->long_url !!}';
            }, 500);
        </script>
    </head>
    <body>
        <noscript>
            Redirecting to
            <a
                href="{{ $linkeable->long_url }}"
            >
                {{ $linkeable->long_url }}
            </a>
        </noscript>

        @yield('body-end')
    </body>
</html>
