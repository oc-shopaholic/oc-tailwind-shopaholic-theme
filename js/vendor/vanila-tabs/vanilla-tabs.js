export default class VanillaTabs {

	constructor( opts ) {

		const DEFAULTS = {
			'selector': '.tabs',
			'type': 'horizontal',
			'responsiveBreak': 840,
			'activeIndex' : 0
		}

		this.options = Object.assign( DEFAULTS, opts );
		this.elems = document.querySelectorAll( this.options.selector );

		// skip building tabs if they were already initialized
		this.skipIfInitialized = ( tabsElem ) => {

			// skip element if already initialized
			if( tabsElem.classList.contains('tabs__initialized') ) {
				return;
			}

		}

		this.buildUI();
		this.handleNavigation();
		this.handleResponsive();

	}

	// initialize the UI Elements
	buildUI(){

		let tabs = this.elems;

		// walk on all tabs on the page
		tabs.forEach( ( el, i ) => {
			
			let tabsElem = el,
			childNodes = tabsElem.childNodes,
			tabsTitles = [],
			tabsStyle = this.options.type;

			this.skipIfInitialized( tabsElem );

			tabsElem.classList.add( 'style__' + this.options.type );
			tabsElem.classList.add( 'tabs__initialized' );

			for( let i = 0; i < childNodes.length; i++ ) {

				let tabItem = childNodes[i];

				if ( tabItem.nodeType != Node.TEXT_NODE ) {

					// add tab__content CSS class
					tabItem.classList.add( 'tabs__content');

					// grab tab title from data attribute
					let tabTitle = tabItem.dataset.title ? tabItem.dataset.title : '';
					tabsTitles.push( tabTitle );

					// wrap tab content
					let tabContent = tabItem.innerHTML;
					tabItem.innerHTML = '<div class="tabs__content_wrapper">' + tabContent + '</div>';

					// insert nav link for accordion navigation
					tabItem.insertAdjacentHTML( 'afterbegin', '<a class="tabs__nav_link">' + tabTitle + '</a>');

				}

			}

			// create horizontal / vertical tabs navigation elements
			let navElemsHTML = '';

			tabsTitles.forEach( ( title ) => {
				navElemsHTML = navElemsHTML + '<a class="tabs__nav_link">' + title + '</a>';
			});

			tabsElem.insertAdjacentHTML( 'afterbegin', '<li class="tabs__nav">' + navElemsHTML + '</li>');

			// set initial active tab
			let activeTabIndex = Number( this.options.activeIndex );

			// validate active tab index. but, you can specify -1 for accordion tabs to make all of them closed by defaults
			if( tabsStyle != 'accordion' && activeTabIndex != -1 ) {
				if( activeTabIndex > (tabsTitles.length - 1) ) {
					console.warn( 'VANILLA TABS: Active tab number from settings is bigger than tabs count. Please remember, that index starts from Zero! To avoid crashes, activeIndex option was reverted to 0.');
					activeTabIndex = 0;
				}

				tabsElem.querySelectorAll( '.tabs__nav > .tabs__nav_link')[ activeTabIndex ].classList.add( 'is__active' );
				tabsElem.querySelectorAll( '.tabs__content')[ activeTabIndex ].classList.add( 'is__active' );
				tabsElem.querySelectorAll( '.tabs__content > .tabs__nav_link')[ activeTabIndex ].classList.add( 'is__active' );

			}

		});

	}

	// navigation: assign click events
	handleNavigation() {

		let tabs = this.elems,
		tabsStyle = this.options.type;

		// walk on all tabs on the page
		tabs.forEach( ( el, i ) => {

			let tabsElem = el;

			this.skipIfInitialized( tabsElem );

			tabsElem.addEventListener( 'click', function( e ){

				if( e.target && e.target.classList.contains( 'tabs__nav_link') ) {
					e.preventDefault();

					let activeTabIndex;

					// if we click on main navigation link
					if( e.target.parentElement.classList == 'tabs__nav' ) {
						activeTabIndex = Array.prototype.slice.call( e.target.parentElement.children ).indexOf( e.target );

					// if we click on accordion nav link
					} else {
						activeTabIndex = Array.prototype.slice.call( e.target.parentElement.parentElement.children ).indexOf( e.target.parentElement ) - 1;
					}

					let tabsContent = tabsElem.getElementsByClassName( 'tabs__content'),
					mainNavLinks = tabsElem.querySelectorAll( '.tabs__nav > .tabs__nav_link'),
					accordionNavLinks = tabsElem.querySelectorAll( '.tabs__content > .tabs__nav_link');

					// toggle accordion panel
					if( ( tabsStyle == 'accordion' || tabsElem.classList.contains( 'is__responsive') ) && e.target.classList.contains( 'is__active') ) {
						tabsContent[ activeTabIndex ].classList.remove( 'is__active');
						mainNavLinks[ activeTabIndex ].classList.remove( 'is__active');
						accordionNavLinks[ activeTabIndex ].classList.remove( 'is__active');
						return;
					}

					// remove active class for inactive tabs
					for( let i = 0; i < tabsContent.length; i++ ) {
						tabsContent[ i ].classList.remove( 'is__active');
					}

					// add active class for a current (active) tab
					tabsContent[ activeTabIndex ].classList.add( 'is__active');

					// add active classes and remove inactive for main nav links
					mainNavLinks.forEach( ( el ) => {
						el.classList.remove( 'is__active');
					});

					mainNavLinks[ activeTabIndex ].classList.add( 'is__active');

					// add active classes and remove inactive for accordion nav links
					accordionNavLinks.forEach( ( el ) => {
						el.classList.remove( 'is__active');
					});									

					accordionNavLinks[ activeTabIndex ].classList.add( 'is__active');
					
				}

			});

		});

	}

	// responsive: tabs to accordion
	handleResponsive() {

		let tabs = this.elems,
		responsiveClassName = 'is__responsive',
		tabsStyle = this.options.type;

		window.addEventListener( 'resize', () => {

			// walk on all tabs on the page
			tabs.forEach( ( el, i ) => {

				let tabsElem = el,
				tabsContent = tabsElem.getElementsByClassName( 'tabs__content'),
				mainNavLinks = tabsElem.querySelectorAll( '.tabs__nav > .tabs__nav_link'),
				accordionNavLinks = tabsElem.querySelectorAll( '.tabs__content > .tabs__nav_link');

				this.skipIfInitialized( tabsElem );
				
				if( window.innerWidth > Number( this.options.responsiveBreak ) ) {

					tabsElem.classList.remove( responsiveClassName );

					if( tabsStyle != 'accordion' ) {
						// set first active tab if all of tabs were closed in accordion mode
						let openTabs = tabsElem.querySelectorAll( '.tabs__nav_link.is__active');
						if( openTabs.length == 0 ) {
							tabsContent[0].classList.add('is__active');
							mainNavLinks[0].classList.add('is__active');
							accordionNavLinks[0].classList.add('is__active');
						}
					}

				} else {

					tabsElem.classList.add( responsiveClassName );

				}

			});

		});

		// manually fire resize event
		window.dispatchEvent( new Event( 'resize' ));

	}

}
