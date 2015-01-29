/* feedreader.js
 *
 * This is the spec file created to test this app using the 
 * Jasmine testing framework. More info at http://jasmine.github.io/2.1
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.  Since allFeeds is an array, we expect its length
         * not to be zero.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test loops through each feed in the allFeeds object
         * and checks to see that a URL is defined and that the URL
         *  is not empty.
         */
        it('URL is defined and not empty', function() {
            var feedsLength = allFeeds.length;
            for (var i = 0; i < feedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).not.toBe('');
            }
        });

        /* This test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is
         * not empty.
         */
        it('name is defined and not empty', function() {
            var feedsLength = allFeeds.length;
            for (var i = 0; i < feedsLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name).not.toBe('');
            }
        });
    });


    /* This is a test suite to test that the pulldown menu is 
     * hidden by default and that it is toggled in response to
     * a user clicking on the menu icon 
     */
    describe('The menu', function() {
        /* This test ensures the menu element is hidden by default.
         * We check this by making sure the body has class menu-hidden
         */
        it('menu is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        /* This test that ensures the menu changes visibility when 
         * the menu icon is clicked. by checking whether 
         * the menu hidden state toggles properly when the menu icon
         * is clicked
         */
        it('menu toggles when menu icon clicked', function() {
            var initialToggleState = $('body').hasClass('menu-hidden');

            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).not.toBe(initialToggleState);

            $('.menu-icon-link').trigger("click");
            expect($('body').hasClass('menu-hidden')).toBe(initialToggleState);
        });
    });
    /* This is a test suite to test that the loadFeed function is 
     * loading at least one .entry element in the .feed container
     */
    describe('Initial Entries', function() {
        /* This calls the asynchronous loadFeed function before each of
        *  the tests.
        */
        beforeEach(function(done) {
             loadFeed(0, done);
        });
        /* This is the test that ensures when the asynchronous loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.  We do this
         * by calling the asynchronous loadFeed function using beforeEach
         * and then checking the the number of 'entry' class elements
         * in the 'feed' container is greater than zero.
         */
       it('loadFeed function returns at least one entry', function() {
           expect($('.feed .entry').length > 0).toBe(true);
      });
    });


   /* The "New Feed Selection" test suite tests whether the content
    * actually changes when a new feed is loaded
    */
    describe('New Feed Selection', function() {
        /* Create a variable to store the value of the initial title of the first feed
        */
        var initialFirstFeedTitle;
        /* Then call the asynchronous loadFeed function before each of
        *  the tests.
        */
        beforeEach(function(done) {
        /* First we store the value of the initial first title of the first feed
        *  so we can check it against the first title of the second feed
        */
        initialFirstFeedTitle = $('.feed .entry h2')[0];
        /* now we load the second feed */
        loadFeed(1, done);
        });
        /* This test ensures when a new feed is loaded by the loadFeed
         * function that the content actually changes. The title of the
         * first entry of the second feed is checked against the title of
         * the first entry of the first feed that was stored in our beforeEach
         */
        it('after loadFeed content changes', function() {
            expect($('.feed .entry h2')[0] != initialFirstFeedTitle).toBe(true);
       });
    });
}());
