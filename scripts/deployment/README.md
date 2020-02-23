You can run this app on its own at port 9090, or run as root with `PORT=80 npm
start` in `/server` (not recommended).

`nginx.conf` is an example for running behind Nginx. If you use `certbot`, this
is all you need to provide, it'll fill in a redirect from http to https and
everything you need for TLS. To enable HTTP/2 support, change `listen 443 ssl;`
to `listen 443 ssl http2;`.

To build a Docker image, run `npm run build-docker` from the project root. You
can run this with `docker run -p 9090:9090 marxist.space:[tag]`, where `tag`
will be either the current Git tag, or short commit sha (check `docker images`
after building).

There's also an example Kubernetes deployment (`k8s.yml`). You'll need to
push your built image somewhere (Docker Hub or a private image repository)
and adjust the `image` field, as well as tweak the load balancer and other
settings.
