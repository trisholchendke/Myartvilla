console.info("You can use ?simple=true to remove redundant HTML."), ! function() {
    function e() {
        function e(e) {
            for (var a = document.getElementsByClassName(e), t = 0; t < a.length; t++) a[t].style.display = "none"
        }
        e("fork-left"), e("fork-right"), e("own-widgets"), e("github-stargazers"), document.getElementById("feedback"), d && (navigator.mediaDevices = {
            getUserMedia: function(e) {
                return {
                    then: function(a) {
                        return {
                            "catch": function(t) {
                                navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, navigate.getUserMedia(e, a, t)
                            }
                        }
                    }
                }
            }
        }, navigator.mediaDevices.getUserMedia || (navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia, window.captureUserMedia = function(e, a, t) {
            navigate.getUserMedia(e, a, t)
        }))
    }

    function a(e) {
        return String(e).replace(/(\d)(?=(\d{3})+$)/g, "$1,")
    }

    function t(e, a) {
        var t = document.createElement("script");
        t.src = e + "?callback=callback00", t.async = !0, a && (t.onload = a), document.body.appendChild(t)
    }

    function r(e, a) {
        window.gType = e, p = document.createElement("span"), p.className = "github-btn", f = document.createElement("a"), f.target = "_blank", f.className = "gh-btn", p.appendChild(f);
        var r = document.createElement("span");
        r.className = "gh-ico", f.appendChild(r), v = document.createElement("span"), v.className = "gh-text", f.appendChild(v), g = document.createElement("a"), g.target = "_blank", g.className = "gh-count", g.innerHTML = "+1K", p.appendChild(g), h && h.appendChild(p), f.href = "https://github.com/" + u + "/", "watch" == gType ? (p.className += " github-watchers", v.innerHTML = "Star ", g.href = "https://github.com/" + u + "/stargazers") : "fork" == gType ? (p.className += " github-forks", v.innerHTML = " Fork ", g.href = "https://github.com/" + u + "/network") : "follow" == gType && (p.className += " github-me", v.innerHTML = "Follow @muaz-khan", f.href = "https://github.com/muaz-khan", g.href = "https://github.com/muaz-khan/followers"), "follow" == gType ? t("https://api.github.com/users/muaz-khan", a) : t("https://api.github.com/repos/" + u, a)
    }

    function n(e) {
        if (!b) return void(e && e());
        var a = document.createElement("script");
        a.src = "https://api.github.com/repos/" + u + "/issues?sha=master&callback=issuesCallback", a.async = !0, e && (a.onload = e), document.body.appendChild(a)
    }

    function o(e) {
        var a = document.createElement("script");
        a.src = "https://api.github.com/repos/" + u + "/commits?sha=master&callback=commitsCallback", a.async = !0, !e && b && (e = n), e && (a.onload = e), document.body.appendChild(a)
    }

    function c(e, a) {
        var t = 6e4,
            r = 60 * t,
            n = 24 * r,
            o = 30 * n,
            c = 365 * n,
            i = e - a;
        return t > i ? Math.round(i / 1e3) + " seconds ago" : r > i ? Math.round(i / t) + " minutes ago" : n > i ? Math.round(i / r) + " hours ago" : o > i ? Math.round(i / n) + " days ago" : c > i ? Math.round(i / o) + " months ago" : Math.round(i / c) + " years ago"
    }

    function i(e) {
        return e = e.replace(/```javascript([^```]+)```|```html([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/```JavaScript([^```]+)```|```html([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/```js([^```]+)```|```html([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/```([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/``([^``]+)``/g, "<pre>$1</pre>"), e = e.replace(/`([^`]+)`/g, "<code>$1</code>"), e = e.replace(/\*\*([^\*\*]+)\*\*/g, "<strong>$1</strong>"), e = e.replace(/#([0-9]+)/g, '<a href="https://github.com/' + u + '/issues/$1" target="_blank">#$1</a>'), e = e.replace(/```([^```]+)```/g, "<pre>$1</pre>"), e = e.replace(/`([^`]+)`/g, "<code>$1</code>")
    }

    function l() {
        var e = document.createElement("script");
        e.src = "https://cdn.webrtc-experiment.com/common.js", e.async = !0, document.body.appendChild(e)
    }
    var s = !!/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB10|IEMobile|Opera Mini|Mobile|mobile/i.test(navigator.userAgent || ""),
        d = !!/BB10|BlackBerry/i.test(navigator.userAgent || ""),
        m = {};
    if (function() {
            function e(e) {
                return decodeURIComponent(e.replace(/\+/g, " "))
            }
            for (var a, t = /([^&=]+)=?([^&]*)/g, r = window.location.search; a = t.exec(r.substring(1));) m[e(a[1])] = e(a[2]);
            if (m.simple) {
                s = d = !0;
                var n = document.getElementById("feedback");
                n && n.parentNode && (n.parentNode.style.display = "none");
                var o = document.querySelector("article");
                o && (o.style.margin = "10px", o.style["max-width"] = "100%", o.style.width = "93%")
            }
        }(), !s || (e(), window.addEventListener("load", e, !1), !m.simple)) {
        var u = window.useThisGithubPath || "muaz-khan/WebRTC-Experiment",
            h = document.querySelector(".github-stargazers");
        window.callback00 = function(e) {
            "watch" == gType ? (g.innerHTML = a(e.data.watchers), console.log("watchers", e.data.watchers)) : "fork" == gType ? (g.innerHTML = a(e.data.forks), console.log("forks", e.data.forks)) : "follow" == gType && (g.innerHTML = a(e.data.followers), console.log("followers", e.data.followers)), g.style.display = "block"
        };
        var p, g, v, f;
        r("watch", function() {
            var e;
            w ? e = o : b && (e = n), r("fork", function() {
                e ? e(function() {
                    r("follow", function() {
                        e != n && b && n()
                    })
                }) : r("follow", function() {
                    e != n && b && n()
                })
            })
        });
        var b = document.getElementById("github-issues");
        b && (b.innerHTML = '<div style="padding:1em .8em;">Getting latest issues...</div>'), window.issuesCallback = function(e) {
            b.innerHTML = "", e = e.data;
            var a = e.length;
            a > 2 && (a = 2);
            for (var t = 0; a > t; t++) {
                var r = e[t],
                    n = document.createElement("div");
                n.className = "commit";
                var o = r.title;
                o.length > 50 ? (o = o.substr(0, 49) + "...", o = '<h2 title="' + r.title + '"><a href="' + r.html_url + '">' + o + "</a></h2><br />") : o = '<h2><a href="' + r.html_url + '">' + r.title + "</a></h2><br />";
                var l = r.body;
                l = l.replace(/</g, "&lt;").replace(/>/g, "&gt;"), l = l.replace(M, k), l = l.replace(/\n/g, " "), l = o + l, l = i(l), l = l.replace(/  /g, ""), l.length > 250 && (l = l.substr(0, 249) + "...");
                var s = document.createElement("div");
                s.className = "commit-desc", s.innerHTML = l, n.appendChild(s);
                var d = document.createElement("div");
                d.className = "commit-meta";
                var m = document.createElement("a");
                m.target = "_blank", m.href = r.html_url, m.className = "commit-url", m.innerHTML = r.comments + " Comments (Submitted " + c(new Date, new Date(r.created_at)) + ")", d.appendChild(m);
                var u = document.createElement("div");
                u.className = "authorship";
                var h = new Image(24, 24);
                h.className = "gravatar", r.user && r.user.avatar_url && (h.src = r.user.avatar_url), u.appendChild(h);
                var p = document.createElement("span");
                p.className = "author-name", p.innerHTML = '<a href="' + r.user.html_url + '" rel="author" target="_blank">' + r.user.login + "</a>", u.appendChild(p), d.appendChild(u), n.appendChild(d), b && b.appendChild(n)
            }
        };
        var w = document.getElementById("github-commits");
        w && (w.innerHTML = '<div style="padding:1em .8em;">Getting latest commits...</div>'), window.commitsCallback = function(e) {
            w.innerHTML = "", e = e.data;
            var a = e.length;
            a > 15 && (a = 15);
            for (var t = 0; a > t; t++) {
                var r = e[t],
                    n = document.createElement("div");
                n.className = "commit";
                var o = r.commit.message;
                o = o.replace(/</g, "&lt;").replace(/>/g, "&gt;"), o = o.replace(M, k).replace(/\n/g, "<br />"), o = o.replace(/\n/g, "<br />"), o = i(o);
                var l = document.createElement("div");
                l.className = "commit-desc", l.innerHTML = o, n.appendChild(l);
                var s = document.createElement("div");
                s.className = "commit-meta";
                var d = document.createElement("a");
                d.target = "_blank", d.href = r.html_url, d.className = "commit-url", d.innerHTML = c(new Date, new Date(r.commit.committer.date)), s.appendChild(d);
                var m = document.createElement("div");
                m.className = "authorship", r.author || (r.author = "muaz-khan");
                var u = new Image(24, 24);
                u.className = "gravatar", u.src = r.author.avatar_url, r.author && r.author.avatar_url || (u.src = "https://goo.gl/KaFpuL"), m.appendChild(u);
                var h = document.createElement("span");
                h.className = "author-name", h.innerHTML = '<a href="' + (r.author.html_url || "https://github.com/muaz-khan") + '" rel="author" target="_blank">' + (r.author.login || "Muaz Khan") + "</a>", m.appendChild(h), s.appendChild(m), n.appendChild(s), w && w.appendChild(n)
            }
        };
        var k = function(e, a, t, r, n, o, c, i, l) {
                var s = 18;
                "(" == e.charAt(0) && ")" == e.charAt(e.length - 1) && (e = e.slice(1, -1)), a || (e = "http://" + e);
                var d = t.replace(/www\./gi, ""),
                    m = d + (n || "") + (o || "") + (c || "") + (i || "") + (l || "");
                return m.length > s && d.length < s && (m = m.slice(0, d.length + (s - d.length)) + "..."), '<a href="' + e + '" target="_blank">' + m.replace("webrtc-experiment.com/", "/").replace("rtcmulticonnection.org/", "/").replace("recordrtc.org/", "/") + "</a>"
            },
            M = /\(?\b(?:(http|https|ftp):\/\/)?((?:www.)?[a-zA-Z0-9\-\.]+[\.][a-zA-Z]{2,4})(?::(\d*))?(?=[\s\/,\.\)])([\/]{1}[^\s\?]*[\/]{1})*(?:\/?([^\s\n\?\[\]\{\}\#]*(?:(?=\.)){1}|[^\s\n\?\[\]\{\}\.\#]*)?([\.]{1}[^\s\?\#]*)?)?(?:\?{1}([^\s\n\#\[\]\(\)]*))?([\#][^\s\n]*)?\)?/gi;
        l()
    }
}();