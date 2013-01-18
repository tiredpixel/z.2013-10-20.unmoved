unmoved
=======

unmoved allows webpage objects to be moved statefully. A
[Node.js](http://nodejs.org) server, utilising [express](http://expressjs.com/)
and [Redis](http://redis.io), records and replays positional data for objects on
a webpage. [jQuery](http://jquery.com) and [jQuery UI](http://jqueryui.com) are
used for the script, giving the gift of movement.

Examples are included within `demo/`. For production, deployment to
[Heroku](http://www.heroku.com) can be accomplished in but few steps, and
`src/unmoved.js` can be included within an existing site.

More sleep lost by [tiredpixel](http://www.tiredpixel.com).


Development
-----------

Install [Redis](http://redis.io).

Install [Node.js](http://nodejs.org) and [npm](https://npmjs.org).

Install dependencies using [npm](https://npmjs.org): `npm install`.

Start the server using your preferred method, setting the environment variables
exampled in `.env.example`; I'm enamoured of
[foreman](https://github.com/ddollar/foreman), so I copy `.env.example` to
`.env`, tweak it all about, and run `foreman start`. In development, the root is
served statically, enabling you to visit </demo/rectangles/index.html> in your
browser, without further ado.


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

Include a copy, minified if required, of the `src/unmoved.js` script.

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
