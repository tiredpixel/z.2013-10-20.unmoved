unmoved
=======

unmoved allows webpage objects to be moved statefully. A
[Node.js](http://nodejs.org) server, utilising [express](http://expressjs.com/)
and [Redis](http://redis.io), records and replays positional data for objects on
a webpage. [jQuery](http://jquery.com) and [jQuery UI](http://jqueryui.com) are
used for the script, giving the gift of movement.

Examples are included within `demo/`. For production, deployment to
[Heroku](http://www.heroku.com) can be accomplished in but few steps, and
existing sites can either include `src/unmoved.js` or link to the minified
version available on the tiredpixel CDN.

More sleep lost by [tiredpixel](http://www.tiredpixel.com).

[![Build Status](https://travis-ci.org/tiredpixel/unmoved.png?branch=master,develop)](https://travis-ci.org/tiredpixel/unmoved)


Demo
----

To view the examples live, please head on over to:

- <http://demo.unmoved.tiredpixel.com/rectangles/>
- <http://demo.unmoved.tiredpixel.com/chess/>


Development
-----------

Install [Redis](http://redis.io).

Install [Node.js](http://nodejs.org) and [npm](https://npmjs.org).

Install dependencies using [npm](https://npmjs.org): `npm install`.

Start the server using your preferred method, setting the environment variables
exampled in `.env.example`; I'm enamoured of
[foreman](https://github.com/ddollar/foreman), so I copy `.env.example` to
`.env`, tweak it all about, and run `foreman start`. In development, the root is
served statically, enabling you to visit
[/demo/rectangles/index.html](/demo/rectangles/index.html) in your browser,
without further ado.

Tests are written using [mocha](http://visionmedia.github.com/mocha/). When
running tests, be sure to configure your test config. I use foreman, so I copy
`.test.env.example` to `.test.env`, tweak it all about, and run:

    foreman run -e .test.env mocha -R spec

The `-R spec` is optional.


Production (Server)
-------------------

Notes for deploying to [Heroku](http://www.heroku.com) follow;
non-[Heroku](http://www.heroku.com) methods are analogous. The notes provided
in [Getting Started with Node.js on Heroku](https://devcenter.heroku.com/articles/nodejs)
go into much greater detail.

Create an application: `heroku create`.

A [git](http://git-scm.com/) remote should have been added automagically.
Deploy: `git push heroku master`.

Install [Redis](http://redis.io) using
[RedisToGo](https://devcenter.heroku.com/articles/redistogo):
`heroku addons:add redistogo`.

Export environment variables, changing REMOTE_HOST to the host for the frontend
site using the server:

    heroku config:add \
      NODE_ENV=production \
      REDIS_URL=$(heroku config:get REDISTOGO_URL) \
      REMOTE_HOST=example.com


Production (Client)
-------------------

Include [jQuery](http://jquery.com) and [jQuery UI](http://jqueryui.com).

Either include a copy, minified if required, of the `src/unmoved.js` script, or
(from v0.3.1 onwards) link to the minified version available on the tiredpixel
CDN. The CDN address is of the form

    http://cdn.tiredpixel.com/tiredpixel/unmoved/VERSION/unmoved.min.js

where VERSION is the release tag name. For example, v0.4.0 is available at

    http://cdn.tiredpixel.com/tiredpixel/unmoved/v0.4.0/unmoved.min.js

Use the exported `unmoved()` method, called on a [jQuery](http://jquery.com)
object or objects:

    $('.unmoved-moveable').unmoved({
      'host' : 'http://EXAMPLE.herokuapp.com'
    });


Contributions
-------------

Contributions are embraced with much love and affection! Please fork the
repository and do your magic, then send a pull request. Simples! If you'd like
to discuss what you're doing or planning to do, or if you get stuck on
something, then just wave. :)

There are no particular priorities, other than anything on the tracker. It's
clear that many improvements can be made to the code and documentation, so work
on whatever makes you happy. :)


License
-------

© 2013 [tiredpixel](http://www.tiredpixel.com). It is free software, released
under the MIT License, and may be redistributed under the terms specified in
`LICENSE`.
