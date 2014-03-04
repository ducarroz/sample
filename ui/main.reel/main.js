/**
 * @module ui/main.reel
 * @requires montage/ui/component
 */
var Component = require("montage/ui/component").Component;

/**
 * @class Main
 * @extends Component
 */
exports.Main = Component.specialize(/** @lends Main# */ {
    constructor: {
        value: function Main() {
            this.super();

            /*
                HTML5Rocks is nice enough to enable cross-origin on all their pages, thanks!
             */
            this.requestURLs = [
                'http://www.html5rocks.com/en/tutorials/file/xhr2/',
                'http://www.html5rocks.com/en/tutorials/webperformance/usertiming/',
                'http://www.html5rocks.com/en/tutorials/eme/basics/',
                'http://www.html5rocks.com/en/tutorials/es6/promises/',
                'http://www.html5rocks.com/en/tutorials/developertools/devtools-terminal/',
                'http://www.html5rocks.com/en/tutorials/developertools/mobile/'
            ];
        }
    },

    requests: {
        value: []
    },

    templateDidLoad: {
        value: function() {
            var self = this;

            this.count.value = this.requestURLs.length;
            this.requestURLs.forEach(function(url) {
                self.loadURL(url);
            });

//            this.checkRequest();
        }
    },

    checkRequest: {
        value: function() {
            var self = this,
                done = true;

            this.requests.forEach(function(object) {
//                if (object.xhr.status < 200) {
//                    done = false;
//                }
                console.log(object.xhr);
            });

            if (done) {
                this.requests.forEach(function(object) {
                    console.log("XHR:", object.xhr.url, object.xhr.uuid, "-->", object.uuids.join(" >> "));
                });
            } else {
                setTimeout(function() { self.checkRequest();}, 100);
            }
        }
    },

    loadURL: {
        value: function(url) {
            var self = this,
                xhr = new XMLHttpRequest(),
                cacheInfo = {};

            xhr.open('GET', url, true);
            xhr.url = url;

            xhr.addEventListener("load", function() {
                console.log("LOADED", url);
                self.count.value --;
            });

            cacheInfo.uuids = [xhr.uuid];

            xhr.addEventListener("error", function() {
                console.log("ERROR", url);
                self.count.value --;
            });

            cacheInfo.uuids.push(xhr.uuid);
            cacheInfo.xhr = xhr;
            this.requests.push(cacheInfo);

            if (cacheInfo.uuids[0] !== cacheInfo.uuids[1]) {
                console.warn("uuid has changed for", url);
            }

            xhr.send();
        }
    }
});
