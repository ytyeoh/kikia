/*!
 * jQuery JavaScript Library v1.12.1
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-02-22T19:07Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Support: IE11 only
	// In IE 11 fullscreen elements inside of an iframe have
	// 100x too small dimensions (gh-1764).
	if ( document.msFullscreenElement && window.top !== window ) {

		// Support: IE11 only
		// Running getBoundingClientRect on a disconnected node
		// in IE throws an error.
		if ( elem.getClientRects().length ) {
			val = Math.round( elem.getBoundingClientRect()[ name ] * 100 );
		}
	}

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) >= 0 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8+
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	if ( !document.implementation.createHTMLDocument ) {
		return false;
	}
	var doc = document.implementation.createHTMLDocument( "" );
	doc.body.innerHTML = "<form></form><form></form>";
	return doc.body.childNodes.length === 2;
} )();


// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	// document.implementation stops scripts or inline event handlers from
	// being executed immediately
	context = context || ( support.createHTMLDocument ?
		document.implementation.createHTMLDocument( "" ) :
		document );

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( self, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function($, undefined) {

/**
 * Unobtrusive scripting adapter for jQuery
 * https://github.com/rails/jquery-ujs
 *
 * Requires jQuery 1.8.0 or later.
 *
 * Released under the MIT license
 *
 */

  // Cut down on the number of issues from people inadvertently including jquery_ujs twice
  // by detecting and raising an error when it happens.
  'use strict';

  if ( $.rails !== undefined ) {
    $.error('jquery-ujs has already been loaded!');
  }

  // Shorthand to make it a little easier to call public rails functions from within rails.js
  var rails;
  var $document = $(document);

  $.rails = rails = {
    // Link elements bound by jquery-ujs
    linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',

    // Button elements bound by jquery-ujs
    buttonClickSelector: 'button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)',

    // Select elements bound by jquery-ujs
    inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',

    // Form elements bound by jquery-ujs
    formSubmitSelector: 'form',

    // Form input elements bound by jquery-ujs
    formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',

    // Form input elements disabled during form submission
    disableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',

    // Form input elements re-enabled after form submission
    enableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',

    // Form required input elements
    requiredInputSelector: 'input[name][required]:not([disabled]), textarea[name][required]:not([disabled])',

    // Form file input elements
    fileInputSelector: 'input[type=file]:not([disabled])',

    // Link onClick disable selector with possible reenable after remote submission
    linkDisableSelector: 'a[data-disable-with], a[data-disable]',

    // Button onClick disable selector with possible reenable after remote submission
    buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]',

    // Up-to-date Cross-Site Request Forgery token
    csrfToken: function() {
     return $('meta[name=csrf-token]').attr('content');
    },

    // URL param that must contain the CSRF token
    csrfParam: function() {
     return $('meta[name=csrf-param]').attr('content');
    },

    // Make sure that every Ajax request sends the CSRF token
    CSRFProtection: function(xhr) {
      var token = rails.csrfToken();
      if (token) xhr.setRequestHeader('X-CSRF-Token', token);
    },

    // Make sure that all forms have actual up-to-date tokens (cached forms contain old ones)
    refreshCSRFTokens: function(){
      $('form input[name="' + rails.csrfParam() + '"]').val(rails.csrfToken());
    },

    // Triggers an event on an element and returns false if the event result is false
    fire: function(obj, name, data) {
      var event = $.Event(name);
      obj.trigger(event, data);
      return event.result !== false;
    },

    // Default confirm dialog, may be overridden with custom confirm dialog in $.rails.confirm
    confirm: function(message) {
      return confirm(message);
    },

    // Default ajax function, may be overridden with custom function in $.rails.ajax
    ajax: function(options) {
      return $.ajax(options);
    },

    // Default way to get an element's href. May be overridden at $.rails.href.
    href: function(element) {
      return element[0].href;
    },

    // Checks "data-remote" if true to handle the request through a XHR request.
    isRemote: function(element) {
      return element.data('remote') !== undefined && element.data('remote') !== false;
    },

    // Submits "remote" forms and links with ajax
    handleRemote: function(element) {
      var method, url, data, withCredentials, dataType, options;

      if (rails.fire(element, 'ajax:before')) {
        withCredentials = element.data('with-credentials') || null;
        dataType = element.data('type') || ($.ajaxSettings && $.ajaxSettings.dataType);

        if (element.is('form')) {
          method = element.data('ujs:submit-button-formmethod') || element.attr('method');
          url = element.data('ujs:submit-button-formaction') || element.attr('action');
          data = $(element[0]).serializeArray();
          // memoized value from clicked submit button
          var button = element.data('ujs:submit-button');
          if (button) {
            data.push(button);
            element.data('ujs:submit-button', null);
          }
          element.data('ujs:submit-button-formmethod', null);
          element.data('ujs:submit-button-formaction', null);
        } else if (element.is(rails.inputChangeSelector)) {
          method = element.data('method');
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else if (element.is(rails.buttonClickSelector)) {
          method = element.data('method') || 'get';
          url = element.data('url');
          data = element.serialize();
          if (element.data('params')) data = data + '&' + element.data('params');
        } else {
          method = element.data('method');
          url = rails.href(element);
          data = element.data('params') || null;
        }

        options = {
          type: method || 'GET', data: data, dataType: dataType,
          // stopping the "ajax:beforeSend" event will cancel the ajax request
          beforeSend: function(xhr, settings) {
            if (settings.dataType === undefined) {
              xhr.setRequestHeader('accept', '*/*;q=0.5, ' + settings.accepts.script);
            }
            if (rails.fire(element, 'ajax:beforeSend', [xhr, settings])) {
              element.trigger('ajax:send', xhr);
            } else {
              return false;
            }
          },
          success: function(data, status, xhr) {
            element.trigger('ajax:success', [data, status, xhr]);
          },
          complete: function(xhr, status) {
            element.trigger('ajax:complete', [xhr, status]);
          },
          error: function(xhr, status, error) {
            element.trigger('ajax:error', [xhr, status, error]);
          },
          crossDomain: rails.isCrossDomain(url)
        };

        // There is no withCredentials for IE6-8 when
        // "Enable native XMLHTTP support" is disabled
        if (withCredentials) {
          options.xhrFields = {
            withCredentials: withCredentials
          };
        }

        // Only pass url to `ajax` options if not blank
        if (url) { options.url = url; }

        return rails.ajax(options);
      } else {
        return false;
      }
    },

    // Determines if the request is a cross domain request.
    isCrossDomain: function(url) {
      var originAnchor = document.createElement('a');
      originAnchor.href = location.href;
      var urlAnchor = document.createElement('a');

      try {
        urlAnchor.href = url;
        // This is a workaround to a IE bug.
        urlAnchor.href = urlAnchor.href;

        // If URL protocol is false or is a string containing a single colon
        // *and* host are false, assume it is not a cross-domain request
        // (should only be the case for IE7 and IE compatibility mode).
        // Otherwise, evaluate protocol and host of the URL against the origin
        // protocol and host.
        return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) ||
          (originAnchor.protocol + '//' + originAnchor.host ===
            urlAnchor.protocol + '//' + urlAnchor.host));
      } catch (e) {
        // If there is an error parsing the URL, assume it is crossDomain.
        return true;
      }
    },

    // Handles "data-method" on links such as:
    // <a href="/users/5" data-method="delete" rel="nofollow" data-confirm="Are you sure?">Delete</a>
    handleMethod: function(link) {
      var href = rails.href(link),
        method = link.data('method'),
        target = link.attr('target'),
        csrfToken = rails.csrfToken(),
        csrfParam = rails.csrfParam(),
        form = $('<form method="post" action="' + href + '"></form>'),
        metadataInput = '<input name="_method" value="' + method + '" type="hidden" />';

      if (csrfParam !== undefined && csrfToken !== undefined && !rails.isCrossDomain(href)) {
        metadataInput += '<input name="' + csrfParam + '" value="' + csrfToken + '" type="hidden" />';
      }

      if (target) { form.attr('target', target); }

      form.hide().append(metadataInput).appendTo('body');
      form.submit();
    },

    // Helper function that returns form elements that match the specified CSS selector
    // If form is actually a "form" element this will return associated elements outside the from that have
    // the html form attribute set
    formElements: function(form, selector) {
      return form.is('form') ? $(form[0].elements).filter(selector) : form.find(selector);
    },

    /* Disables form elements:
      - Caches element value in 'ujs:enable-with' data store
      - Replaces element text with value of 'data-disable-with' attribute
      - Sets disabled property to true
    */
    disableFormElements: function(form) {
      rails.formElements(form, rails.disableSelector).each(function() {
        rails.disableFormElement($(this));
      });
    },

    disableFormElement: function(element) {
      var method, replacement;

      method = element.is('button') ? 'html' : 'val';
      replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element[method]());
        element[method](replacement);
      }

      element.prop('disabled', true);
      element.data('ujs:disabled', true);
    },

    /* Re-enables disabled form elements:
      - Replaces element text with cached value from 'ujs:enable-with' data store (created in `disableFormElements`)
      - Sets disabled property to false
    */
    enableFormElements: function(form) {
      rails.formElements(form, rails.enableSelector).each(function() {
        rails.enableFormElement($(this));
      });
    },

    enableFormElement: function(element) {
      var method = element.is('button') ? 'html' : 'val';
      if (element.data('ujs:enable-with') !== undefined) {
        element[method](element.data('ujs:enable-with'));
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.prop('disabled', false);
      element.removeData('ujs:disabled');
    },

   /* For 'data-confirm' attribute:
      - Fires `confirm` event
      - Shows the confirmation dialog
      - Fires the `confirm:complete` event

      Returns `true` if no function stops the chain and user chose yes; `false` otherwise.
      Attaching a handler to the element's `confirm` event that returns a `falsy` value cancels the confirmation dialog.
      Attaching a handler to the element's `confirm:complete` event that returns a `falsy` value makes this function
      return false. The `confirm:complete` event is fired whether or not the user answered true or false to the dialog.
   */
    allowAction: function(element) {
      var message = element.data('confirm'),
          answer = false, callback;
      if (!message) { return true; }

      if (rails.fire(element, 'confirm')) {
        try {
          answer = rails.confirm(message);
        } catch (e) {
          (console.error || console.log).call(console, e.stack || e);
        }
        callback = rails.fire(element, 'confirm:complete', [answer]);
      }
      return answer && callback;
    },

    // Helper function which checks for blank inputs in a form that match the specified CSS selector
    blankInputs: function(form, specifiedSelector, nonBlank) {
      var foundInputs = $(),
        input,
        valueToCheck,
        radiosForNameWithNoneSelected,
        radioName,
        selector = specifiedSelector || 'input,textarea',
        requiredInputs = form.find(selector),
        checkedRadioButtonNames = {};

      requiredInputs.each(function() {
        input = $(this);
        if (input.is('input[type=radio]')) {

          // Don't count unchecked required radio as blank if other radio with same name is checked,
          // regardless of whether same-name radio input has required attribute or not. The spec
          // states https://www.w3.org/TR/html5/forms.html#the-required-attribute
          radioName = input.attr('name');

          // Skip if we've already seen the radio with this name.
          if (!checkedRadioButtonNames[radioName]) {

            // If none checked
            if (form.find('input[type=radio]:checked[name="' + radioName + '"]').length === 0) {
              radiosForNameWithNoneSelected = form.find(
                'input[type=radio][name="' + radioName + '"]');
              foundInputs = foundInputs.add(radiosForNameWithNoneSelected);
            }

            // We only need to check each name once.
            checkedRadioButtonNames[radioName] = radioName;
          }
        } else {
          valueToCheck = input.is('input[type=checkbox],input[type=radio]') ? input.is(':checked') : !!input.val();
          if (valueToCheck === nonBlank) {
            foundInputs = foundInputs.add(input);
          }
        }
      });
      return foundInputs.length ? foundInputs : false;
    },

    // Helper function which checks for non-blank inputs in a form that match the specified CSS selector
    nonBlankInputs: function(form, specifiedSelector) {
      return rails.blankInputs(form, specifiedSelector, true); // true specifies nonBlank
    },

    // Helper function, needed to provide consistent behavior in IE
    stopEverything: function(e) {
      $(e.target).trigger('ujs:everythingStopped');
      e.stopImmediatePropagation();
      return false;
    },

    //  Replace element's html with the 'data-disable-with' after storing original html
    //  and prevent clicking on it
    disableElement: function(element) {
      var replacement = element.data('disable-with');

      if (replacement !== undefined) {
        element.data('ujs:enable-with', element.html()); // store enabled state
        element.html(replacement);
      }

      element.bind('click.railsDisable', function(e) { // prevent further clicking
        return rails.stopEverything(e);
      });
      element.data('ujs:disabled', true);
    },

    // Restore element to its original state which was disabled by 'disableElement' above
    enableElement: function(element) {
      if (element.data('ujs:enable-with') !== undefined) {
        element.html(element.data('ujs:enable-with')); // set to old enabled state
        element.removeData('ujs:enable-with'); // clean up cache
      }
      element.unbind('click.railsDisable'); // enable element
      element.removeData('ujs:disabled');
    }
  };

  if (rails.fire($document, 'rails:attachBindings')) {

    $.ajaxPrefilter(function(options, originalOptions, xhr){ if ( !options.crossDomain ) { rails.CSRFProtection(xhr); }});

    // This event works the same as the load event, except that it fires every
    // time the page is loaded.
    //
    // See https://github.com/rails/jquery-ujs/issues/357
    // See https://developer.mozilla.org/en-US/docs/Using_Firefox_1.5_caching
    $(window).on('pageshow.rails', function () {
      $($.rails.enableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableFormElement(element);
        }
      });

      $($.rails.linkDisableSelector).each(function () {
        var element = $(this);

        if (element.data('ujs:disabled')) {
          $.rails.enableElement(element);
        }
      });
    });

    $document.delegate(rails.linkDisableSelector, 'ajax:complete', function() {
        rails.enableElement($(this));
    });

    $document.delegate(rails.buttonDisableSelector, 'ajax:complete', function() {
        rails.enableFormElement($(this));
    });

    $document.delegate(rails.linkClickSelector, 'click.rails', function(e) {
      var link = $(this), method = link.data('method'), data = link.data('params'), metaClick = e.metaKey || e.ctrlKey;
      if (!rails.allowAction(link)) return rails.stopEverything(e);

      if (!metaClick && link.is(rails.linkDisableSelector)) rails.disableElement(link);

      if (rails.isRemote(link)) {
        if (metaClick && (!method || method === 'GET') && !data) { return true; }

        var handleRemote = rails.handleRemote(link);
        // Response from rails.handleRemote() will either be false or a deferred object promise.
        if (handleRemote === false) {
          rails.enableElement(link);
        } else {
          handleRemote.fail( function() { rails.enableElement(link); } );
        }
        return false;

      } else if (method) {
        rails.handleMethod(link);
        return false;
      }
    });

    $document.delegate(rails.buttonClickSelector, 'click.rails', function(e) {
      var button = $(this);

      if (!rails.allowAction(button) || !rails.isRemote(button)) return rails.stopEverything(e);

      if (button.is(rails.buttonDisableSelector)) rails.disableFormElement(button);

      var handleRemote = rails.handleRemote(button);
      // Response from rails.handleRemote() will either be false or a deferred object promise.
      if (handleRemote === false) {
        rails.enableFormElement(button);
      } else {
        handleRemote.fail( function() { rails.enableFormElement(button); } );
      }
      return false;
    });

    $document.delegate(rails.inputChangeSelector, 'change.rails', function(e) {
      var link = $(this);
      if (!rails.allowAction(link) || !rails.isRemote(link)) return rails.stopEverything(e);

      rails.handleRemote(link);
      return false;
    });

    $document.delegate(rails.formSubmitSelector, 'submit.rails', function(e) {
      var form = $(this),
        remote = rails.isRemote(form),
        blankRequiredInputs,
        nonBlankFileInputs;

      if (!rails.allowAction(form)) return rails.stopEverything(e);

      // Skip other logic when required values are missing or file upload is present
      if (form.attr('novalidate') === undefined) {
        if (form.data('ujs:formnovalidate-button') === undefined) {
          blankRequiredInputs = rails.blankInputs(form, rails.requiredInputSelector, false);
          if (blankRequiredInputs && rails.fire(form, 'ajax:aborted:required', [blankRequiredInputs])) {
            return rails.stopEverything(e);
          }
        } else {
          // Clear the formnovalidate in case the next button click is not on a formnovalidate button
          // Not strictly necessary to do here, since it is also reset on each button click, but just to be certain
          form.data('ujs:formnovalidate-button', undefined);
        }
      }

      if (remote) {
        nonBlankFileInputs = rails.nonBlankInputs(form, rails.fileInputSelector);
        if (nonBlankFileInputs) {
          // Slight timeout so that the submit button gets properly serialized
          // (make it easy for event handler to serialize form without disabled values)
          setTimeout(function(){ rails.disableFormElements(form); }, 13);
          var aborted = rails.fire(form, 'ajax:aborted:file', [nonBlankFileInputs]);

          // Re-enable form elements if event bindings return false (canceling normal form submission)
          if (!aborted) { setTimeout(function(){ rails.enableFormElements(form); }, 13); }

          return aborted;
        }

        rails.handleRemote(form);
        return false;

      } else {
        // Slight timeout so that the submit button gets properly serialized
        setTimeout(function(){ rails.disableFormElements(form); }, 13);
      }
    });

    $document.delegate(rails.formInputClickSelector, 'click.rails', function(event) {
      var button = $(this);

      if (!rails.allowAction(button)) return rails.stopEverything(event);

      // Register the pressed submit button
      var name = button.attr('name'),
        data = name ? {name:name, value:button.val()} : null;

      var form = button.closest('form');
      if (form.length === 0) {
        form = $('#' + button.attr('form'));
      }
      form.data('ujs:submit-button', data);

      // Save attributes from button
      form.data('ujs:formnovalidate-button', button.attr('formnovalidate'));
      form.data('ujs:submit-button-formaction', button.attr('formaction'));
      form.data('ujs:submit-button-formmethod', button.attr('formmethod'));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:send.rails', function(event) {
      if (this === event.target) rails.disableFormElements($(this));
    });

    $document.delegate(rails.formSubmitSelector, 'ajax:complete.rails', function(event) {
      if (this === event.target) rails.enableFormElements($(this));
    });

    $(function(){
      rails.refreshCSRFTokens();
    });
  }

})( jQuery );
//     Underscore.js 1.8.3
//     http://underscorejs.org
//     (c) 2009-2015 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){function n(n){function t(t,r,e,u,i,o){for(;i>=0&&o>i;i+=n){var a=u?u[i]:i;e=r(e,t[a],a,t)}return e}return function(r,e,u,i){e=b(e,i,4);var o=!k(r)&&m.keys(r),a=(o||r).length,c=n>0?0:a-1;return arguments.length<3&&(u=r[o?o[c]:c],c+=n),t(r,e,u,o,c,a)}}function t(n){return function(t,r,e){r=x(r,e);for(var u=O(t),i=n>0?0:u-1;i>=0&&u>i;i+=n)if(r(t[i],i,t))return i;return-1}}function r(n,t,r){return function(e,u,i){var o=0,a=O(e);if("number"==typeof i)n>0?o=i>=0?i:Math.max(i+a,o):a=i>=0?Math.min(i+1,a):i+a+1;else if(r&&i&&a)return i=r(e,u),e[i]===u?i:-1;if(u!==u)return i=t(l.call(e,o,a),m.isNaN),i>=0?i+o:-1;for(i=n>0?o:a-1;i>=0&&a>i;i+=n)if(e[i]===u)return i;return-1}}function e(n,t){var r=I.length,e=n.constructor,u=m.isFunction(e)&&e.prototype||a,i="constructor";for(m.has(n,i)&&!m.contains(t,i)&&t.push(i);r--;)i=I[r],i in n&&n[i]!==u[i]&&!m.contains(t,i)&&t.push(i)}var u=this,i=u._,o=Array.prototype,a=Object.prototype,c=Function.prototype,f=o.push,l=o.slice,s=a.toString,p=a.hasOwnProperty,h=Array.isArray,v=Object.keys,g=c.bind,y=Object.create,d=function(){},m=function(n){return n instanceof m?n:this instanceof m?void(this._wrapped=n):new m(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=m),exports._=m):u._=m,m.VERSION="1.8.3";var b=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}},x=function(n,t,r){return null==n?m.identity:m.isFunction(n)?b(n,t,r):m.isObject(n)?m.matcher(n):m.property(n)};m.iteratee=function(n,t){return x(n,t,1/0)};var _=function(n,t){return function(r){var e=arguments.length;if(2>e||null==r)return r;for(var u=1;e>u;u++)for(var i=arguments[u],o=n(i),a=o.length,c=0;a>c;c++){var f=o[c];t&&r[f]!==void 0||(r[f]=i[f])}return r}},j=function(n){if(!m.isObject(n))return{};if(y)return y(n);d.prototype=n;var t=new d;return d.prototype=null,t},w=function(n){return function(t){return null==t?void 0:t[n]}},A=Math.pow(2,53)-1,O=w("length"),k=function(n){var t=O(n);return"number"==typeof t&&t>=0&&A>=t};m.each=m.forEach=function(n,t,r){t=b(t,r);var e,u;if(k(n))for(e=0,u=n.length;u>e;e++)t(n[e],e,n);else{var i=m.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},m.map=m.collect=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=Array(u),o=0;u>o;o++){var a=e?e[o]:o;i[o]=t(n[a],a,n)}return i},m.reduce=m.foldl=m.inject=n(1),m.reduceRight=m.foldr=n(-1),m.find=m.detect=function(n,t,r){var e;return e=k(n)?m.findIndex(n,t,r):m.findKey(n,t,r),e!==void 0&&e!==-1?n[e]:void 0},m.filter=m.select=function(n,t,r){var e=[];return t=x(t,r),m.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e},m.reject=function(n,t,r){return m.filter(n,m.negate(x(t)),r)},m.every=m.all=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(!t(n[o],o,n))return!1}return!0},m.some=m.any=function(n,t,r){t=x(t,r);for(var e=!k(n)&&m.keys(n),u=(e||n).length,i=0;u>i;i++){var o=e?e[i]:i;if(t(n[o],o,n))return!0}return!1},m.contains=m.includes=m.include=function(n,t,r,e){return k(n)||(n=m.values(n)),("number"!=typeof r||e)&&(r=0),m.indexOf(n,t,r)>=0},m.invoke=function(n,t){var r=l.call(arguments,2),e=m.isFunction(t);return m.map(n,function(n){var u=e?t:n[t];return null==u?u:u.apply(n,r)})},m.pluck=function(n,t){return m.map(n,m.property(t))},m.where=function(n,t){return m.filter(n,m.matcher(t))},m.findWhere=function(n,t){return m.find(n,m.matcher(t))},m.max=function(n,t,r){var e,u,i=-1/0,o=-1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],e>i&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(u>o||u===-1/0&&i===-1/0)&&(i=n,o=u)});return i},m.min=function(n,t,r){var e,u,i=1/0,o=1/0;if(null==t&&null!=n){n=k(n)?n:m.values(n);for(var a=0,c=n.length;c>a;a++)e=n[a],i>e&&(i=e)}else t=x(t,r),m.each(n,function(n,r,e){u=t(n,r,e),(o>u||1/0===u&&1/0===i)&&(i=n,o=u)});return i},m.shuffle=function(n){for(var t,r=k(n)?n:m.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=m.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},m.sample=function(n,t,r){return null==t||r?(k(n)||(n=m.values(n)),n[m.random(n.length-1)]):m.shuffle(n).slice(0,Math.max(0,t))},m.sortBy=function(n,t,r){return t=x(t,r),m.pluck(m.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var F=function(n){return function(t,r,e){var u={};return r=x(r,e),m.each(t,function(e,i){var o=r(e,i,t);n(u,e,o)}),u}};m.groupBy=F(function(n,t,r){m.has(n,r)?n[r].push(t):n[r]=[t]}),m.indexBy=F(function(n,t,r){n[r]=t}),m.countBy=F(function(n,t,r){m.has(n,r)?n[r]++:n[r]=1}),m.toArray=function(n){return n?m.isArray(n)?l.call(n):k(n)?m.map(n,m.identity):m.values(n):[]},m.size=function(n){return null==n?0:k(n)?n.length:m.keys(n).length},m.partition=function(n,t,r){t=x(t,r);var e=[],u=[];return m.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},m.first=m.head=m.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:m.initial(n,n.length-t)},m.initial=function(n,t,r){return l.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},m.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:m.rest(n,Math.max(0,n.length-t))},m.rest=m.tail=m.drop=function(n,t,r){return l.call(n,null==t||r?1:t)},m.compact=function(n){return m.filter(n,m.identity)};var S=function(n,t,r,e){for(var u=[],i=0,o=e||0,a=O(n);a>o;o++){var c=n[o];if(k(c)&&(m.isArray(c)||m.isArguments(c))){t||(c=S(c,t,r));var f=0,l=c.length;for(u.length+=l;l>f;)u[i++]=c[f++]}else r||(u[i++]=c)}return u};m.flatten=function(n,t){return S(n,t,!1)},m.without=function(n){return m.difference(n,l.call(arguments,1))},m.uniq=m.unique=function(n,t,r,e){m.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=x(r,e));for(var u=[],i=[],o=0,a=O(n);a>o;o++){var c=n[o],f=r?r(c,o,n):c;t?(o&&i===f||u.push(c),i=f):r?m.contains(i,f)||(i.push(f),u.push(c)):m.contains(u,c)||u.push(c)}return u},m.union=function(){return m.uniq(S(arguments,!0,!0))},m.intersection=function(n){for(var t=[],r=arguments.length,e=0,u=O(n);u>e;e++){var i=n[e];if(!m.contains(t,i)){for(var o=1;r>o&&m.contains(arguments[o],i);o++);o===r&&t.push(i)}}return t},m.difference=function(n){var t=S(arguments,!0,!0,1);return m.filter(n,function(n){return!m.contains(t,n)})},m.zip=function(){return m.unzip(arguments)},m.unzip=function(n){for(var t=n&&m.max(n,O).length||0,r=Array(t),e=0;t>e;e++)r[e]=m.pluck(n,e);return r},m.object=function(n,t){for(var r={},e=0,u=O(n);u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},m.findIndex=t(1),m.findLastIndex=t(-1),m.sortedIndex=function(n,t,r,e){r=x(r,e,1);for(var u=r(t),i=0,o=O(n);o>i;){var a=Math.floor((i+o)/2);r(n[a])<u?i=a+1:o=a}return i},m.indexOf=r(1,m.findIndex,m.sortedIndex),m.lastIndexOf=r(-1,m.findLastIndex),m.range=function(n,t,r){null==t&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var E=function(n,t,r,e,u){if(!(e instanceof t))return n.apply(r,u);var i=j(n.prototype),o=n.apply(i,u);return m.isObject(o)?o:i};m.bind=function(n,t){if(g&&n.bind===g)return g.apply(n,l.call(arguments,1));if(!m.isFunction(n))throw new TypeError("Bind must be called on a function");var r=l.call(arguments,2),e=function(){return E(n,e,t,this,r.concat(l.call(arguments)))};return e},m.partial=function(n){var t=l.call(arguments,1),r=function(){for(var e=0,u=t.length,i=Array(u),o=0;u>o;o++)i[o]=t[o]===m?arguments[e++]:t[o];for(;e<arguments.length;)i.push(arguments[e++]);return E(n,r,this,this,i)};return r},m.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=m.bind(n[r],n);return n},m.memoize=function(n,t){var r=function(e){var u=r.cache,i=""+(t?t.apply(this,arguments):e);return m.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},m.delay=function(n,t){var r=l.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},m.defer=m.partial(m.delay,m,1),m.throttle=function(n,t,r){var e,u,i,o=null,a=0;r||(r={});var c=function(){a=r.leading===!1?0:m.now(),o=null,i=n.apply(e,u),o||(e=u=null)};return function(){var f=m.now();a||r.leading!==!1||(a=f);var l=t-(f-a);return e=this,u=arguments,0>=l||l>t?(o&&(clearTimeout(o),o=null),a=f,i=n.apply(e,u),o||(e=u=null)):o||r.trailing===!1||(o=setTimeout(c,l)),i}},m.debounce=function(n,t,r){var e,u,i,o,a,c=function(){var f=m.now()-o;t>f&&f>=0?e=setTimeout(c,t-f):(e=null,r||(a=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,o=m.now();var f=r&&!e;return e||(e=setTimeout(c,t)),f&&(a=n.apply(i,u),i=u=null),a}},m.wrap=function(n,t){return m.partial(t,n)},m.negate=function(n){return function(){return!n.apply(this,arguments)}},m.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},m.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},m.before=function(n,t){var r;return function(){return--n>0&&(r=t.apply(this,arguments)),1>=n&&(t=null),r}},m.once=m.partial(m.before,2);var M=!{toString:null}.propertyIsEnumerable("toString"),I=["valueOf","isPrototypeOf","toString","propertyIsEnumerable","hasOwnProperty","toLocaleString"];m.keys=function(n){if(!m.isObject(n))return[];if(v)return v(n);var t=[];for(var r in n)m.has(n,r)&&t.push(r);return M&&e(n,t),t},m.allKeys=function(n){if(!m.isObject(n))return[];var t=[];for(var r in n)t.push(r);return M&&e(n,t),t},m.values=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},m.mapObject=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=u.length,o={},a=0;i>a;a++)e=u[a],o[e]=t(n[e],e,n);return o},m.pairs=function(n){for(var t=m.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},m.invert=function(n){for(var t={},r=m.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},m.functions=m.methods=function(n){var t=[];for(var r in n)m.isFunction(n[r])&&t.push(r);return t.sort()},m.extend=_(m.allKeys),m.extendOwn=m.assign=_(m.keys),m.findKey=function(n,t,r){t=x(t,r);for(var e,u=m.keys(n),i=0,o=u.length;o>i;i++)if(e=u[i],t(n[e],e,n))return e},m.pick=function(n,t,r){var e,u,i={},o=n;if(null==o)return i;m.isFunction(t)?(u=m.allKeys(o),e=b(t,r)):(u=S(arguments,!1,!1,1),e=function(n,t,r){return t in r},o=Object(o));for(var a=0,c=u.length;c>a;a++){var f=u[a],l=o[f];e(l,f,o)&&(i[f]=l)}return i},m.omit=function(n,t,r){if(m.isFunction(t))t=m.negate(t);else{var e=m.map(S(arguments,!1,!1,1),String);t=function(n,t){return!m.contains(e,t)}}return m.pick(n,t,r)},m.defaults=_(m.allKeys,!0),m.create=function(n,t){var r=j(n);return t&&m.extendOwn(r,t),r},m.clone=function(n){return m.isObject(n)?m.isArray(n)?n.slice():m.extend({},n):n},m.tap=function(n,t){return t(n),n},m.isMatch=function(n,t){var r=m.keys(t),e=r.length;if(null==n)return!e;for(var u=Object(n),i=0;e>i;i++){var o=r[i];if(t[o]!==u[o]||!(o in u))return!1}return!0};var N=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof m&&(n=n._wrapped),t instanceof m&&(t=t._wrapped);var u=s.call(n);if(u!==s.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}var i="[object Array]"===u;if(!i){if("object"!=typeof n||"object"!=typeof t)return!1;var o=n.constructor,a=t.constructor;if(o!==a&&!(m.isFunction(o)&&o instanceof o&&m.isFunction(a)&&a instanceof a)&&"constructor"in n&&"constructor"in t)return!1}r=r||[],e=e||[];for(var c=r.length;c--;)if(r[c]===n)return e[c]===t;if(r.push(n),e.push(t),i){if(c=n.length,c!==t.length)return!1;for(;c--;)if(!N(n[c],t[c],r,e))return!1}else{var f,l=m.keys(n);if(c=l.length,m.keys(t).length!==c)return!1;for(;c--;)if(f=l[c],!m.has(t,f)||!N(n[f],t[f],r,e))return!1}return r.pop(),e.pop(),!0};m.isEqual=function(n,t){return N(n,t)},m.isEmpty=function(n){return null==n?!0:k(n)&&(m.isArray(n)||m.isString(n)||m.isArguments(n))?0===n.length:0===m.keys(n).length},m.isElement=function(n){return!(!n||1!==n.nodeType)},m.isArray=h||function(n){return"[object Array]"===s.call(n)},m.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},m.each(["Arguments","Function","String","Number","Date","RegExp","Error"],function(n){m["is"+n]=function(t){return s.call(t)==="[object "+n+"]"}}),m.isArguments(arguments)||(m.isArguments=function(n){return m.has(n,"callee")}),"function"!=typeof/./&&"object"!=typeof Int8Array&&(m.isFunction=function(n){return"function"==typeof n||!1}),m.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},m.isNaN=function(n){return m.isNumber(n)&&n!==+n},m.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===s.call(n)},m.isNull=function(n){return null===n},m.isUndefined=function(n){return n===void 0},m.has=function(n,t){return null!=n&&p.call(n,t)},m.noConflict=function(){return u._=i,this},m.identity=function(n){return n},m.constant=function(n){return function(){return n}},m.noop=function(){},m.property=w,m.propertyOf=function(n){return null==n?function(){}:function(t){return n[t]}},m.matcher=m.matches=function(n){return n=m.extendOwn({},n),function(t){return m.isMatch(t,n)}},m.times=function(n,t,r){var e=Array(Math.max(0,n));t=b(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},m.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},m.now=Date.now||function(){return(new Date).getTime()};var B={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},T=m.invert(B),R=function(n){var t=function(t){return n[t]},r="(?:"+m.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};m.escape=R(B),m.unescape=R(T),m.result=function(n,t,r){var e=null==n?void 0:n[t];return e===void 0&&(e=r),m.isFunction(e)?e.call(n):e};var q=0;m.uniqueId=function(n){var t=++q+"";return n?n+t:t},m.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var K=/(.)^/,z={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},D=/\\|'|\r|\n|\u2028|\u2029/g,L=function(n){return"\\"+z[n]};m.template=function(n,t,r){!t&&r&&(t=r),t=m.defaults({},t,m.templateSettings);var e=RegExp([(t.escape||K).source,(t.interpolate||K).source,(t.evaluate||K).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,o,a){return i+=n.slice(u,a).replace(D,L),u=a+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":o&&(i+="';\n"+o+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var o=new Function(t.variable||"obj","_",i)}catch(a){throw a.source=i,a}var c=function(n){return o.call(this,n,m)},f=t.variable||"obj";return c.source="function("+f+"){\n"+i+"}",c},m.chain=function(n){var t=m(n);return t._chain=!0,t};var P=function(n,t){return n._chain?m(t).chain():t};m.mixin=function(n){m.each(m.functions(n),function(t){var r=m[t]=n[t];m.prototype[t]=function(){var n=[this._wrapped];return f.apply(n,arguments),P(this,r.apply(m,n))}})},m.mixin(m),m.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=o[n];m.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],P(this,r)}}),m.each(["concat","join","slice"],function(n){var t=o[n];m.prototype[n]=function(){return P(this,t.apply(this._wrapped,arguments))}}),m.prototype.value=function(){return this._wrapped},m.prototype.valueOf=m.prototype.toJSON=m.prototype.value,m.prototype.toString=function(){return""+this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return m})}).call(this);
//# sourceMappingURL=underscore-min.map
;
(function() {
  this.Gmaps = {
    build: function(type, options) {
      var model;
      if (options == null) {
        options = {};
      }
      model = _.isFunction(options.handler) ? options.handler : Gmaps.Objects.Handler;
      return new model(type, options);
    },
    Builders: {},
    Objects: {},
    Google: {
      Objects: {},
      Builders: {}
    }
  };

}).call(this);
(function() {
  var moduleKeywords,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  moduleKeywords = ['extended', 'included'];

  this.Gmaps.Base = (function() {
    function Base() {}

    Base.extend = function(obj) {
      var key, ref, value;
      for (key in obj) {
        value = obj[key];
        if (indexOf.call(moduleKeywords, key) < 0) {
          this[key] = value;
        }
      }
      if ((ref = obj.extended) != null) {
        ref.apply(this);
      }
      return this;
    };

    Base.include = function(obj) {
      var key, ref, value;
      for (key in obj) {
        value = obj[key];
        if (indexOf.call(moduleKeywords, key) < 0) {
          this.prototype[key] = value;
        }
      }
      if ((ref = obj.included) != null) {
        ref.apply(this);
      }
      return this;
    };

    return Base;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.BaseBuilder = (function() {
    function BaseBuilder() {}

    BaseBuilder.prototype.build = function() {
      return new (this.model_class())(this.serviceObject);
    };

    BaseBuilder.prototype.before_init = function() {};

    BaseBuilder.prototype.after_init = function() {};

    BaseBuilder.prototype.addListener = function(action, fn) {
      return this.primitives().addListener(this.getServiceObject(), action, fn);
    };

    BaseBuilder.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    BaseBuilder.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    BaseBuilder.prototype.model_class = function() {
      return this.constructor.OBJECT;
    };

    return BaseBuilder;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.Builders = function(builderClass, objectClass, primitivesProvider) {
    return {
      build: function(args, provider_options, internal_options) {
        var builder;
        objectClass.PRIMITIVES = primitivesProvider;
        builderClass.OBJECT = objectClass;
        builderClass.PRIMITIVES = primitivesProvider;
        builder = new builderClass(args, provider_options, internal_options);
        return builder.build();
      }
    };
  };

}).call(this);
(function() {
  this.Gmaps.Objects.Handler = (function() {
    function Handler(type, options) {
      this.type = type;
      if (options == null) {
        options = {};
      }
      this.setPrimitives(options);
      this.setOptions(options);
      this._cacheAllBuilders();
      this.resetBounds();
    }

    Handler.prototype.buildMap = function(options, onMapLoad) {
      if (onMapLoad == null) {
        onMapLoad = function() {};
      }
      return this.map = this._builder('Map').build(options, (function(_this) {
        return function() {
          _this._createClusterer();
          return onMapLoad();
        };
      })(this));
    };

    Handler.prototype.addMarkers = function(markers_data, provider_options) {
      return _.map(markers_data, (function(_this) {
        return function(marker_data) {
          return _this.addMarker(marker_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addMarker = function(marker_data, provider_options) {
      var marker;
      marker = this._builder('Marker').build(marker_data, provider_options, this.marker_options);
      marker.setMap(this.getMap());
      this.clusterer.addMarker(marker);
      return marker;
    };

    Handler.prototype.addCircles = function(circles_data, provider_options) {
      return _.map(circles_data, (function(_this) {
        return function(circle_data) {
          return _this.addCircle(circle_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addCircle = function(circle_data, provider_options) {
      return this._addResource('circle', circle_data, provider_options);
    };

    Handler.prototype.addPolylines = function(polylines_data, provider_options) {
      return _.map(polylines_data, (function(_this) {
        return function(polyline_data) {
          return _this.addPolyline(polyline_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addPolyline = function(polyline_data, provider_options) {
      return this._addResource('polyline', polyline_data, provider_options);
    };

    Handler.prototype.addPolygons = function(polygons_data, provider_options) {
      return _.map(polygons_data, (function(_this) {
        return function(polygon_data) {
          return _this.addPolygon(polygon_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addPolygon = function(polygon_data, provider_options) {
      return this._addResource('polygon', polygon_data, provider_options);
    };

    Handler.prototype.addKmls = function(kmls_data, provider_options) {
      return _.map(kmls_data, (function(_this) {
        return function(kml_data) {
          return _this.addKml(kml_data, provider_options);
        };
      })(this));
    };

    Handler.prototype.addKml = function(kml_data, provider_options) {
      return this._addResource('kml', kml_data, provider_options);
    };

    Handler.prototype.removeMarkers = function(gem_markers) {
      return _.map(gem_markers, (function(_this) {
        return function(gem_marker) {
          return _this.removeMarker(gem_marker);
        };
      })(this));
    };

    Handler.prototype.removeMarker = function(gem_marker) {
      gem_marker.clear();
      return this.clusterer.removeMarker(gem_marker);
    };

    Handler.prototype.fitMapToBounds = function() {
      return this.map.fitToBounds(this.bounds.getServiceObject());
    };

    Handler.prototype.getMap = function() {
      return this.map.getServiceObject();
    };

    Handler.prototype.setOptions = function(options) {
      this.marker_options = _.extend(this._default_marker_options(), options.markers);
      this.builders = _.extend(this._default_builders(), options.builders);
      return this.models = _.extend(this._default_models(), options.models);
    };

    Handler.prototype.resetBounds = function() {
      return this.bounds = this._builder('Bound').build();
    };

    Handler.prototype.setPrimitives = function(options) {
      return this.primitives = options.primitives === void 0 ? this._rootModule().Primitives() : _.isFunction(options.primitives) ? options.primitives() : options.primitives;
    };

    Handler.prototype.currentInfowindow = function() {
      return this.builders.Marker.CURRENT_INFOWINDOW;
    };

    Handler.prototype._addResource = function(resource_name, resource_data, provider_options) {
      var resource;
      resource = this._builder(resource_name).build(resource_data, provider_options);
      resource.setMap(this.getMap());
      return resource;
    };

    Handler.prototype._cacheAllBuilders = function() {
      var that;
      that = this;
      return _.each(['Bound', 'Circle', 'Clusterer', 'Kml', 'Map', 'Marker', 'Polygon', 'Polyline'], function(kind) {
        return that._builder(kind);
      });
    };

    Handler.prototype._clusterize = function() {
      return _.isObject(this.marker_options.clusterer);
    };

    Handler.prototype._createClusterer = function() {
      return this.clusterer = this._builder('Clusterer').build({
        map: this.getMap()
      }, this.marker_options.clusterer);
    };

    Handler.prototype._default_marker_options = function() {
      return _.clone({
        singleInfowindow: true,
        maxRandomDistance: 0,
        clusterer: {
          maxZoom: 5,
          gridSize: 50
        }
      });
    };

    Handler.prototype._builder = function(name) {
      var name1;
      name = this._capitalize(name);
      if (this[name1 = "__builder" + name] == null) {
        this[name1] = Gmaps.Objects.Builders(this.builders[name], this.models[name], this.primitives);
      }
      return this["__builder" + name];
    };

    Handler.prototype._default_models = function() {
      var models;
      models = _.clone(this._rootModule().Objects);
      if (this._clusterize()) {
        return models;
      } else {
        models.Clusterer = Gmaps.Objects.NullClusterer;
        return models;
      }
    };

    Handler.prototype._capitalize = function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    Handler.prototype._default_builders = function() {
      return _.clone(this._rootModule().Builders);
    };

    Handler.prototype._rootModule = function() {
      if (this.__rootModule == null) {
        this.__rootModule = Gmaps[this.type];
      }
      return this.__rootModule;
    };

    return Handler;

  })();

}).call(this);
(function() {
  this.Gmaps.Objects.NullClusterer = (function() {
    function NullClusterer() {}

    NullClusterer.prototype.addMarkers = function() {};

    NullClusterer.prototype.addMarker = function() {};

    NullClusterer.prototype.clear = function() {};

    NullClusterer.prototype.removeMarker = function() {};

    return NullClusterer;

  })();

}).call(this);
(function() {
  this.Gmaps.Google.Objects.Common = {
    getServiceObject: function() {
      return this.serviceObject;
    },
    setMap: function(map) {
      return this.getServiceObject().setMap(map);
    },
    clear: function() {
      return this.getServiceObject().setMap(null);
    },
    show: function() {
      return this.getServiceObject().setVisible(true);
    },
    hide: function() {
      return this.getServiceObject().setVisible(false);
    },
    isVisible: function() {
      return this.getServiceObject().getVisible();
    },
    primitives: function() {
      return this.constructor.PRIMITIVES;
    }
  };

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Bound = (function(superClass) {
    extend(Bound, superClass);

    function Bound(options) {
      this.before_init();
      this.serviceObject = new (this.primitives().latLngBounds);
      this.after_init();
    }

    return Bound;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Circle = (function(superClass) {
    extend(Circle, superClass);

    function Circle(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_circle();
      this.after_init();
    }

    Circle.prototype.create_circle = function() {
      return new (this.primitives().circle)(this.circle_options());
    };

    Circle.prototype.circle_options = function() {
      var base_options;
      base_options = {
        center: new (this.primitives().latLng)(this.args.lat, this.args.lng),
        radius: this.args.radius
      };
      return _.defaults(base_options, this.provider_options);
    };

    return Circle;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Clusterer = (function(superClass) {
    extend(Clusterer, superClass);

    function Clusterer(args, options) {
      this.args = args;
      this.options = options;
      this.before_init();
      this.serviceObject = new (this.primitives().clusterer)(this.args.map, [], this.options);
      this.after_init();
    }

    return Clusterer;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Kml = (function(superClass) {
    extend(Kml, superClass);

    function Kml(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_kml();
      this.after_init();
    }

    Kml.prototype.create_kml = function() {
      return new (this.primitives().kml)(this.args.url, this.kml_options());
    };

    Kml.prototype.kml_options = function() {
      var base_options;
      base_options = {};
      return _.defaults(base_options, this.provider_options);
    };

    return Kml;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Map = (function(superClass) {
    extend(Map, superClass);

    function Map(options, onMapLoad) {
      var provider_options;
      this.before_init();
      provider_options = _.extend(this.default_options(), options.provider);
      this.internal_options = options.internal;
      this.serviceObject = new (this.primitives().map)(document.getElementById(this.internal_options.id), provider_options);
      this.on_map_load(onMapLoad);
      this.after_init();
    }

    Map.prototype.build = function() {
      return new (this.model_class())(this.serviceObject, this.primitives());
    };

    Map.prototype.on_map_load = function(onMapLoad) {
      return this.primitives().addListenerOnce(this.serviceObject, 'idle', onMapLoad);
    };

    Map.prototype.default_options = function() {
      return {
        mapTypeId: this.primitives().mapTypes('ROADMAP'),
        center: new (this.primitives().latLng)(0, 0),
        zoom: 8
      };
    };

    return Map;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Marker = (function(superClass) {
    extend(Marker, superClass);

    Marker.CURRENT_INFOWINDOW = void 0;

    Marker.CACHE_STORE = {};

    function Marker(args, provider_options, internal_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.internal_options = internal_options != null ? internal_options : {};
      this.infowindow_binding = bind(this.infowindow_binding, this);
      this.before_init();
      this.create_marker();
      this.create_infowindow_on_click();
      this.after_init();
    }

    Marker.prototype.build = function() {
      return this.marker = new (this.model_class())(this.serviceObject);
    };

    Marker.prototype.create_marker = function() {
      return this.serviceObject = new (this.primitives().marker)(this.marker_options());
    };

    Marker.prototype.create_infowindow = function() {
      if (!_.isString(this.args.infowindow)) {
        return null;
      }
      return new (this.primitives().infowindow)({
        content: this.args.infowindow
      });
    };

    Marker.prototype.marker_options = function() {
      var base_options, coords;
      coords = this._randomized_coordinates();
      base_options = {
        title: this.args.marker_title,
        position: new (this.primitives().latLng)(coords[0], coords[1]),
        icon: this._get_picture('picture'),
        shadow: this._get_picture('shadow')
      };
      return _.extend(this.provider_options, base_options);
    };

    Marker.prototype.create_infowindow_on_click = function() {
      return this.addListener('click', this.infowindow_binding);
    };

    Marker.prototype.infowindow_binding = function() {
      var base;
      if (this._should_close_infowindow()) {
        this.constructor.CURRENT_INFOWINDOW.close();
      }
      this.marker.panTo();
      if (this.infowindow == null) {
        this.infowindow = this.create_infowindow();
      }
      if (this.infowindow == null) {
        return;
      }
      this.infowindow.open(this.getServiceObject().getMap(), this.getServiceObject());
      if ((base = this.marker).infowindow == null) {
        base.infowindow = this.infowindow;
      }
      return this.constructor.CURRENT_INFOWINDOW = this.infowindow;
    };

    Marker.prototype._get_picture = function(picture_name) {
      if (!_.isObject(this.args[picture_name]) || !_.isString(this.args[picture_name].url)) {
        return null;
      }
      return this._create_or_retrieve_image(this._picture_args(picture_name));
    };

    Marker.prototype._create_or_retrieve_image = function(picture_args) {
      if (this.constructor.CACHE_STORE[picture_args.url] === void 0) {
        this.constructor.CACHE_STORE[picture_args.url] = new (this.primitives().markerImage)(picture_args.url, picture_args.size, picture_args.origin, picture_args.anchor, picture_args.scaledSize);
      }
      return this.constructor.CACHE_STORE[picture_args.url];
    };

    Marker.prototype._picture_args = function(picture_name) {
      return {
        url: this.args[picture_name].url,
        anchor: this._createImageAnchorPosition(this.args[picture_name].anchor),
        size: new (this.primitives().size)(this.args[picture_name].width, this.args[picture_name].height),
        scaledSize: null,
        origin: null
      };
    };

    Marker.prototype._createImageAnchorPosition = function(anchorLocation) {
      if (!_.isArray(anchorLocation)) {
        return null;
      }
      return new (this.primitives().point)(anchorLocation[0], anchorLocation[1]);
    };

    Marker.prototype._should_close_infowindow = function() {
      return this.internal_options.singleInfowindow && (this.constructor.CURRENT_INFOWINDOW != null);
    };

    Marker.prototype._randomized_coordinates = function() {
      var Lat, Lng, dx, dy, random;
      if (!_.isNumber(this.internal_options.maxRandomDistance)) {
        return [this.args.lat, this.args.lng];
      }
      random = function() {
        return Math.random() * 2 - 1;
      };
      dx = this.internal_options.maxRandomDistance * random();
      dy = this.internal_options.maxRandomDistance * random();
      Lat = parseFloat(this.args.lat) + (180 / Math.PI) * (dy / 6378137);
      Lng = parseFloat(this.args.lng) + (90 / Math.PI) * (dx / 6378137) / Math.cos(this.args.lat);
      return [Lat, Lng];
    };

    return Marker;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Polygon = (function(superClass) {
    extend(Polygon, superClass);

    function Polygon(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_polygon();
      this.after_init();
    }

    Polygon.prototype.create_polygon = function() {
      return new (this.primitives().polygon)(this.polygon_options());
    };

    Polygon.prototype.polygon_options = function() {
      var base_options;
      base_options = {
        path: this._build_path()
      };
      return _.defaults(base_options, this.provider_options);
    };

    Polygon.prototype._build_path = function() {
      return _.map(this.args, (function(_this) {
        return function(arg) {
          return new (_this.primitives().latLng)(arg.lat, arg.lng);
        };
      })(this));
    };

    return Polygon;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Builders.Polyline = (function(superClass) {
    extend(Polyline, superClass);

    function Polyline(args, provider_options) {
      this.args = args;
      this.provider_options = provider_options != null ? provider_options : {};
      this.before_init();
      this.serviceObject = this.create_polyline();
      this.after_init();
    }

    Polyline.prototype.create_polyline = function() {
      return new (this.primitives().polyline)(this.polyline_options());
    };

    Polyline.prototype.polyline_options = function() {
      var base_options;
      base_options = {
        path: this._build_path()
      };
      return _.defaults(base_options, this.provider_options);
    };

    Polyline.prototype._build_path = function() {
      return _.map(this.args, (function(_this) {
        return function(arg) {
          return new (_this.primitives().latLng)(arg.lat, arg.lng);
        };
      })(this));
    };

    return Polyline;

  })(Gmaps.Objects.BaseBuilder);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Bound = (function(superClass) {
    extend(Bound, superClass);

    Bound.include(Gmaps.Google.Objects.Common);

    function Bound(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Bound.prototype.extendWith = function(array_or_object) {
      var collection;
      collection = _.isArray(array_or_object) ? array_or_object : [array_or_object];
      return _.each(collection, (function(_this) {
        return function(object) {
          return object.updateBounds(_this);
        };
      })(this));
    };

    Bound.prototype.extend = function(value) {
      return this.getServiceObject().extend(this.primitives().latLngFromPosition(value));
    };

    return Bound;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Circle = (function(superClass) {
    extend(Circle, superClass);

    Circle.include(Gmaps.Google.Objects.Common);

    function Circle(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Circle.prototype.updateBounds = function(bounds) {
      bounds.extend(this.getServiceObject().getBounds().getNorthEast());
      return bounds.extend(this.getServiceObject().getBounds().getSouthWest());
    };

    return Circle;

  })(Gmaps.Base);

}).call(this);
(function() {
  this.Gmaps.Google.Objects.Clusterer = (function() {
    function Clusterer(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Clusterer.prototype.addMarkers = function(markers) {
      return _.each(markers, (function(_this) {
        return function(marker) {
          return _this.addMarker(marker);
        };
      })(this));
    };

    Clusterer.prototype.addMarker = function(marker) {
      return this.getServiceObject().addMarker(marker.getServiceObject());
    };

    Clusterer.prototype.clear = function() {
      return this.getServiceObject().clearMarkers();
    };

    Clusterer.prototype.removeMarker = function(marker) {
      return this.getServiceObject().removeMarker(marker.getServiceObject());
    };

    Clusterer.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    return Clusterer;

  })();

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Kml = (function(superClass) {
    extend(Kml, superClass);

    function Kml(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Kml.prototype.updateBounds = function(bounds) {};

    Kml.prototype.setMap = function(map) {
      return this.getServiceObject().setMap(map);
    };

    Kml.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    Kml.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    return Kml;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Map = (function(superClass) {
    extend(Map, superClass);

    function Map(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Map.prototype.getServiceObject = function() {
      return this.serviceObject;
    };

    Map.prototype.centerOn = function(position) {
      return this.getServiceObject().setCenter(this.primitives().latLngFromPosition(position));
    };

    Map.prototype.fitToBounds = function(boundsObject) {
      if (!boundsObject.isEmpty()) {
        return this.getServiceObject().fitBounds(boundsObject);
      }
    };

    Map.prototype.primitives = function() {
      return this.constructor.PRIMITIVES;
    };

    return Map;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Marker = (function(superClass) {
    extend(Marker, superClass);

    Marker.include(Gmaps.Google.Objects.Common);

    function Marker(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Marker.prototype.updateBounds = function(bounds) {
      return bounds.extend(this.getServiceObject().position);
    };

    Marker.prototype.panTo = function() {
      return this.getServiceObject().getMap().panTo(this.getServiceObject().getPosition());
    };

    return Marker;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Polygon = (function(superClass) {
    extend(Polygon, superClass);

    Polygon.include(Gmaps.Google.Objects.Common);

    function Polygon(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Polygon.prototype.updateBounds = function(bounds) {
      var i, len, ll, ref, results;
      ref = this.serviceObject.getPath().getArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ll = ref[i];
        results.push(bounds.extend(ll));
      }
      return results;
    };

    return Polygon;

  })(Gmaps.Base);

}).call(this);
(function() {
  var extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  this.Gmaps.Google.Objects.Polyline = (function(superClass) {
    extend(Polyline, superClass);

    Polyline.include(Gmaps.Google.Objects.Common);

    function Polyline(serviceObject) {
      this.serviceObject = serviceObject;
    }

    Polyline.prototype.updateBounds = function(bounds) {
      var i, len, ll, ref, results;
      ref = this.serviceObject.getPath().getArray();
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        ll = ref[i];
        results.push(bounds.extend(ll));
      }
      return results;
    };

    return Polyline;

  })(Gmaps.Base);

}).call(this);
(function() {
  this.Gmaps.Google.Primitives = function() {
    var factory;
    factory = {
      point: google.maps.Point,
      size: google.maps.Size,
      circle: google.maps.Circle,
      latLng: google.maps.LatLng,
      latLngBounds: google.maps.LatLngBounds,
      map: google.maps.Map,
      mapTypez: google.maps.MapTypeId,
      markerImage: google.maps.MarkerImage,
      marker: google.maps.Marker,
      infowindow: google.maps.InfoWindow,
      listener: google.maps.event.addListener,
      clusterer: MarkerClusterer,
      listenerOnce: google.maps.event.addListenerOnce,
      polyline: google.maps.Polyline,
      polygon: google.maps.Polygon,
      kml: google.maps.KmlLayer,
      addListener: function(object, event_name, fn) {
        return factory.listener(object, event_name, fn);
      },
      addListenerOnce: function(object, event_name, fn) {
        return factory.listenerOnce(object, event_name, fn);
      },
      mapTypes: function(type) {
        return factory.mapTypez[type];
      },
      latLngFromPosition: function(position) {
        if (_.isArray(position)) {
          return new factory.latLng(position[0], position[1]);
        } else {
          if (_.isNumber(position.lat) && _.isNumber(position.lng)) {
            return new factory.latLng(position.lat, position.lng);
          } else {
            if (_.isFunction(position.getServiceObject)) {
              return position.getServiceObject().getPosition();
            } else {
              return position;
            }
          }
        }
      }
    };
    return factory;
  };

}).call(this);
(function() {


}).call(this);
/**
 * jQuery Geocoding and Places Autocomplete Plugin - V 1.6.5
 *
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2014
 * @author Ubilabs http://ubilabs.net, 2014
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

// # $.geocomplete()
// ## jQuery Geocoding and Places Autocomplete Plugin
//
// * https://github.com/ubilabs/geocomplete/
// * by Martin Kleppe <kleppe@ubilabs.net>

(function($, window, document, undefined){

  // ## Options
  // The default options for this plugin.
  //
  // * `map` - Might be a selector, an jQuery object or a DOM element. Default is `false` which shows no map.
  // * `details` - The container that should be populated with data. Defaults to `false` which ignores the setting.
  // * 'detailsScope' - Allows you to scope the 'details' container and have multiple geocomplete fields on one page. Must be a parent of the input. Default is 'null'
  // * `location` - Location to initialize the map on. Might be an address `string` or an `array` with [latitude, longitude] or a `google.maps.LatLng`object. Default is `false` which shows a blank map.
  // * `bounds` - Whether to snap geocode search to map bounds. Default: `true` if false search globally. Alternatively pass a custom `LatLngBounds object.
  // * `autoselect` - Automatically selects the highlighted item or the first item from the suggestions list on Enter.
  // * `detailsAttribute` - The attribute's name to use as an indicator. Default: `"name"`
  // * `mapOptions` - Options to pass to the `google.maps.Map` constructor. See the full list [here](http://code.google.com/apis/maps/documentation/javascript/reference.html#MapOptions).
  // * `mapOptions.zoom` - The inital zoom level. Default: `14`
  // * `mapOptions.scrollwheel` - Whether to enable the scrollwheel to zoom the map. Default: `false`
  // * `mapOptions.mapTypeId` - The map type. Default: `"roadmap"`
  // * `markerOptions` - The options to pass to the `google.maps.Marker` constructor. See the full list [here](http://code.google.com/apis/maps/documentation/javascript/reference.html#MarkerOptions).
  // * `markerOptions.draggable` - If the marker is draggable. Default: `false`. Set to true to enable dragging.
  // * `markerOptions.disabled` - Do not show marker. Default: `false`. Set to true to disable marker.
  // * `maxZoom` - The maximum zoom level too zoom in after a geocoding response. Default: `16`
  // * `types` - An array containing one or more of the supported types for the places request. Default: `['geocode']` See the full list [here](http://code.google.com/apis/maps/documentation/javascript/places.html#place_search_requests).
  // * `blur` - Trigger geocode when input loses focus.
  // * `geocodeAfterResult` - If blur is set to true, choose whether to geocode if user has explicitly selected a result before blur.
  // * `restoreValueAfterBlur` - Restores the input's value upon blurring. Default is `false` which ignores the setting.

  var defaults = {
    bounds: true,
    country: null,
    map: false,
    details: false,
    detailsAttribute: "name",
    detailsScope: null,
    autoselect: true,
    location: false,

    mapOptions: {
      zoom: 14,
      scrollwheel: false,
      mapTypeId: "roadmap"
    },

    markerOptions: {
      draggable: false
    },

    maxZoom: 16,
    types: ['geocode'],
    blur: false,
    geocodeAfterResult: false,
    restoreValueAfterBlur: false
  };

  // See: [Geocoding Types](https://developers.google.com/maps/documentation/geocoding/#Types)
  // on Google Developers.
  var componentTypes = ("street_address route intersection political " +
    "country administrative_area_level_1 administrative_area_level_2 " +
    "administrative_area_level_3 colloquial_area locality sublocality " +
    "neighborhood premise subpremise postal_code natural_feature airport " +
    "park point_of_interest post_box street_number floor room " +
    "lat lng viewport location " +
    "formatted_address location_type bounds").split(" ");

  // See: [Places Details Responses](https://developers.google.com/maps/documentation/javascript/places#place_details_responses)
  // on Google Developers.
  var placesDetails = ("id place_id url website vicinity reference name rating " +
    "international_phone_number icon formatted_phone_number").split(" ");

  // The actual plugin constructor.
  function GeoComplete(input, options) {

    this.options = $.extend(true, {}, defaults, options);

    this.input = input;
    this.$input = $(input);

    this._defaults = defaults;
    this._name = 'geocomplete';

    this.init();
  }

  // Initialize all parts of the plugin.
  $.extend(GeoComplete.prototype, {
    init: function(){
      this.initMap();
      this.initMarker();
      this.initGeocoder();
      this.initDetails();
      this.initLocation();
    },

    // Initialize the map but only if the option `map` was set.
    // This will create a `map` within the given container
    // using the provided `mapOptions` or link to the existing map instance.
    initMap: function(){
      if (!this.options.map){ return; }

      if (typeof this.options.map.setCenter == "function"){
        this.map = this.options.map;
        return;
      }

      this.map = new google.maps.Map(
        $(this.options.map)[0],
        this.options.mapOptions
      );

      // add click event listener on the map
      google.maps.event.addListener(
        this.map,
        'click',
        $.proxy(this.mapClicked, this)
      );

      // add dragend even listener on the map
      google.maps.event.addListener(
        this.map,
        'dragend',
        $.proxy(this.mapDragged, this)
      );

      // add idle even listener on the map
      google.maps.event.addListener(
        this.map,
        'idle',
        $.proxy(this.mapIdle, this)
      );

      google.maps.event.addListener(
        this.map,
        'zoom_changed',
        $.proxy(this.mapZoomed, this)
      );
    },

    // Add a marker with the provided `markerOptions` but only
    // if the option was set. Additionally it listens for the `dragend` event
    // to notify the plugin about changes.
    initMarker: function(){
      if (!this.map){ return; }
      var options = $.extend(this.options.markerOptions, { map: this.map });

      if (options.disabled){ return; }

      this.marker = new google.maps.Marker(options);

      google.maps.event.addListener(
        this.marker,
        'dragend',
        $.proxy(this.markerDragged, this)
      );
    },

    // Associate the input with the autocompleter and create a geocoder
    // to fall back when the autocompleter does not return a value.
    initGeocoder: function(){

      // Indicates is user did select a result from the dropdown.
      var selected = false;

      var options = {
        types: this.options.types,
        bounds: this.options.bounds === true ? null : this.options.bounds,
        componentRestrictions: this.options.componentRestrictions
      };

      if (this.options.country){
        options.componentRestrictions = {country: this.options.country};
      }

      this.autocomplete = new google.maps.places.Autocomplete(
        this.input, options
      );

      this.geocoder = new google.maps.Geocoder();

      // Bind autocomplete to map bounds but only if there is a map
      // and `options.bindToMap` is set to true.
      if (this.map && this.options.bounds === true){
        this.autocomplete.bindTo('bounds', this.map);
      }

      // Watch `place_changed` events on the autocomplete input field.
      google.maps.event.addListener(
        this.autocomplete,
        'place_changed',
        $.proxy(this.placeChanged, this)
      );

      // Prevent parent form from being submitted if user hit enter.
      this.$input.on('keypress.' + this._name, function(event){
        if (event.keyCode === 13){ return false; }
      });

      // Assume that if user types anything after having selected a result,
      // the selected location is not valid any more.
      if (this.options.geocodeAfterResult === true){
        this.$input.bind('keypress.' + this._name, $.proxy(function(){
          if (event.keyCode != 9 && this.selected === true){
              this.selected = false;
          }
        }, this));
      }

      // Listen for "geocode" events and trigger find action.
      this.$input.bind('geocode.' + this._name, $.proxy(function(){
        this.find();
      }, this));

      // Saves the previous input value
      this.$input.bind('geocode:result.' + this._name, $.proxy(function(){
        this.lastInputVal = this.$input.val();
      }, this));

      // Trigger find action when input element is blurred out and user has
      // not explicitly selected a result.
      // (Useful for typing partial location and tabbing to the next field
      // or clicking somewhere else.)
      if (this.options.blur === true){
        this.$input.on('blur.' + this._name, $.proxy(function(){
          if (this.options.geocodeAfterResult === true && this.selected === true) { return; }

          if (this.options.restoreValueAfterBlur === true && this.selected === true) {
            setTimeout($.proxy(this.restoreLastValue, this), 0);
          } else {
            this.find();
          }
        }, this));
      }
    },

    // Prepare a given DOM structure to be populated when we got some data.
    // This will cycle through the list of component types and map the
    // corresponding elements.
    initDetails: function(){
      if (!this.options.details){ return; }

      if(this.options.detailsScope) {
        var $details = $(this.input).parents(this.options.detailsScope).find(this.options.details);
      } else {
        var $details = $(this.options.details);
      }

      var attribute = this.options.detailsAttribute,
        details = {};

      function setDetail(value){
        details[value] = $details.find("[" +  attribute + "=" + value + "]");
      }

      $.each(componentTypes, function(index, key){
        setDetail(key);
        setDetail(key + "_short");
      });

      $.each(placesDetails, function(index, key){
        setDetail(key);
      });

      this.$details = $details;
      this.details = details;
    },

    // Set the initial location of the plugin if the `location` options was set.
    // This method will care about converting the value into the right format.
    initLocation: function() {

      var location = this.options.location, latLng;

      if (!location) { return; }

      if (typeof location == 'string') {
        this.find(location);
        return;
      }

      if (location instanceof Array) {
        latLng = new google.maps.LatLng(location[0], location[1]);
      }

      if (location instanceof google.maps.LatLng){
        latLng = location;
      }

      if (latLng){
        if (this.map){ this.map.setCenter(latLng); }
        if (this.marker){ this.marker.setPosition(latLng); }
      }
    },

    destroy: function(){
      if (this.map) {
        google.maps.event.clearInstanceListeners(this.map);
        google.maps.event.clearInstanceListeners(this.marker);
      }

      this.autocomplete.unbindAll();
      google.maps.event.clearInstanceListeners(this.autocomplete);
      google.maps.event.clearInstanceListeners(this.input);
      this.$input.removeData();
      this.$input.off(this._name);
      this.$input.unbind('.' + this._name);
    },

    // Look up a given address. If no `address` was specified it uses
    // the current value of the input.
    find: function(address){
      this.geocode({
        address: address || this.$input.val()
      });
    },

    // Requests details about a given location.
    // Additionally it will bias the requests to the provided bounds.
    geocode: function(request){
      // Don't geocode if the requested address is empty
      if (!request.address) {
        return;
      }
      if (this.options.bounds && !request.bounds){
        if (this.options.bounds === true){
          request.bounds = this.map && this.map.getBounds();
        } else {
          request.bounds = this.options.bounds;
        }
      }

      if (this.options.country){
        request.region = this.options.country;
      }

      this.geocoder.geocode(request, $.proxy(this.handleGeocode, this));
    },

    // Get the selected result. If no result is selected on the list, then get
    // the first result from the list.
    selectFirstResult: function() {
      //$(".pac-container").hide();

      var selected = '';
      // Check if any result is selected.
      if ($(".pac-item-selected")[0]) {
        selected = '-selected';
      }

      // Get the first suggestion's text.
      var $span1 = $(".pac-container:last .pac-item" + selected + ":first span:nth-child(2)").text();
      var $span2 = $(".pac-container:last .pac-item" + selected + ":first span:nth-child(3)").text();

      // Adds the additional information, if available.
      var firstResult = $span1;
      if ($span2) {
        firstResult += " - " + $span2;
      }

      this.$input.val(firstResult);

      return firstResult;
    },

    // Restores the input value using the previous value if it exists
    restoreLastValue: function() {
      if (this.lastInputVal){ this.$input.val(this.lastInputVal); }
    },

    // Handles the geocode response. If more than one results was found
    // it triggers the "geocode:multiple" events. If there was an error
    // the "geocode:error" event is fired.
    handleGeocode: function(results, status){
      if (status === google.maps.GeocoderStatus.OK) {
        var result = results[0];
        this.$input.val(result.formatted_address);
        this.update(result);

        if (results.length > 1){
          this.trigger("geocode:multiple", results);
        }

      } else {
        this.trigger("geocode:error", status);
      }
    },

    // Triggers a given `event` with optional `arguments` on the input.
    trigger: function(event, argument){
      this.$input.trigger(event, [argument]);
    },

    // Set the map to a new center by passing a `geometry`.
    // If the geometry has a viewport, the map zooms out to fit the bounds.
    // Additionally it updates the marker position.
    center: function(geometry){
      if (geometry.viewport){
        this.map.fitBounds(geometry.viewport);
        if (this.map.getZoom() > this.options.maxZoom){
          this.map.setZoom(this.options.maxZoom);
        }
      } else {
        this.map.setZoom(this.options.maxZoom);
        this.map.setCenter(geometry.location);
      }

      if (this.marker){
        this.marker.setPosition(geometry.location);
        this.marker.setAnimation(this.options.markerOptions.animation);
      }
    },

    // Update the elements based on a single places or geocoding response
    // and trigger the "geocode:result" event on the input.
    update: function(result){

      if (this.map){
        this.center(result.geometry);
      }

      if (this.$details){
        this.fillDetails(result);
      }

      this.trigger("geocode:result", result);
    },

    // Populate the provided elements with new `result` data.
    // This will lookup all elements that has an attribute with the given
    // component type.
    fillDetails: function(result){

      var data = {},
        geometry = result.geometry,
        viewport = geometry.viewport,
        bounds = geometry.bounds;

      // Create a simplified version of the address components.
      $.each(result.address_components, function(index, object){
        var name = object.types[0];

        $.each(object.types, function(index, name){
          data[name] = object.long_name;
          data[name + "_short"] = object.short_name;
        });
      });

      // Add properties of the places details.
      $.each(placesDetails, function(index, key){
        data[key] = result[key];
      });

      // Add infos about the address and geometry.
      $.extend(data, {
        formatted_address: result.formatted_address,
        location_type: geometry.location_type || "PLACES",
        viewport: viewport,
        bounds: bounds,
        location: geometry.location,
        lat: geometry.location.lat(),
        lng: geometry.location.lng()
      });

      // Set the values for all details.
      $.each(this.details, $.proxy(function(key, $detail){
        var value = data[key];
        this.setDetail($detail, value);
      }, this));

      this.data = data;
    },

    // Assign a given `value` to a single `$element`.
    // If the element is an input, the value is set, otherwise it updates
    // the text content.
    setDetail: function($element, value){

      if (value === undefined){
        value = "";
      } else if (typeof value.toUrlValue == "function"){
        value = value.toUrlValue();
      }

      if ($element.is(":input")){
        $element.val(value);
      } else {
        $element.text(value);
      }
    },

    // Fire the "geocode:dragged" event and pass the new position.
    markerDragged: function(event){
      this.trigger("geocode:dragged", event.latLng);
    },

    mapClicked: function(event) {
        this.trigger("geocode:click", event.latLng);
    },

    // Fire the "geocode:mapdragged" event and pass the current position of the map center.
    mapDragged: function(event) {
      this.trigger("geocode:mapdragged", this.map.getCenter());
    },

    // Fire the "geocode:idle" event and pass the current position of the map center.
    mapIdle: function(event) {
      this.trigger("geocode:idle", this.map.getCenter());
    },

    mapZoomed: function(event) {
      this.trigger("geocode:zoom", this.map.getZoom());
    },

    // Restore the old position of the marker to the last knwon location.
    resetMarker: function(){
      this.marker.setPosition(this.data.location);
      this.setDetail(this.details.lat, this.data.location.lat());
      this.setDetail(this.details.lng, this.data.location.lng());
    },

    // Update the plugin after the user has selected an autocomplete entry.
    // If the place has no geometry it passes it to the geocoder.
    placeChanged: function(){
      var place = this.autocomplete.getPlace();
      this.selected = true;

      if (!place.geometry){
        if (this.options.autoselect) {
          // Automatically selects the highlighted item or the first item from the
          // suggestions list.
          var autoSelection = this.selectFirstResult();
          this.find(autoSelection);
        }
      } else {
        // Use the input text if it already gives geometry.
        this.update(place);
      }
    }
  });

  // A plugin wrapper around the constructor.
  // Pass `options` with all settings that are different from the default.
  // The attribute is used to prevent multiple instantiations of the plugin.
  $.fn.geocomplete = function(options) {

    var attribute = 'plugin_geocomplete';

    // If you call `.geocomplete()` with a string as the first parameter
    // it returns the corresponding property or calls the method with the
    // following arguments.
    if (typeof options == "string"){

      var instance = $(this).data(attribute) || $(this).geocomplete().data(attribute),
        prop = instance[options];

      if (typeof prop == "function"){
        prop.apply(instance, Array.prototype.slice.call(arguments, 1));
        return $(this);
      } else {
        if (arguments.length == 2){
          prop = arguments[1];
        }
        return prop;
      }
    } else {
      return this.each(function() {
        // Prevent against multiple instantiations.
        var instance = $.data(this, attribute);
        if (!instance) {
          instance = new GeoComplete( this, options );
          $.data(this, attribute, instance);
        }
      });
    }
  };

})( jQuery, window, document );
(function() {
  var CSRFToken, Click, ComponentUrl, EVENTS, Link, ProgressBar, browserIsntBuggy, browserSupportsCustomEvents, browserSupportsPushState, browserSupportsTurbolinks, bypassOnLoadPopstate, cacheCurrentPage, cacheSize, changePage, clone, constrainPageCacheTo, createDocument, crossOriginRedirect, currentState, enableProgressBar, enableTransitionCache, executeScriptTags, extractTitleAndBody, fetch, fetchHistory, fetchReplacement, historyStateIsDefined, initializeTurbolinks, installDocumentReadyPageEventTriggers, installHistoryChangeHandler, installJqueryAjaxSuccessPageUpdateTrigger, loadedAssets, manuallyTriggerHashChangeForFirefox, pageCache, pageChangePrevented, pagesCached, popCookie, processResponse, progressBar, recallScrollPosition, ref, referer, reflectNewUrl, reflectRedirectedUrl, rememberCurrentState, rememberCurrentUrl, rememberReferer, removeNoscriptTags, requestMethodIsSafe, resetScrollPosition, setAutofocusElement, transitionCacheEnabled, transitionCacheFor, triggerEvent, visit, xhr,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  pageCache = {};

  cacheSize = 10;

  transitionCacheEnabled = false;

  progressBar = null;

  currentState = null;

  loadedAssets = null;

  referer = null;

  xhr = null;

  EVENTS = {
    BEFORE_CHANGE: 'page:before-change',
    FETCH: 'page:fetch',
    RECEIVE: 'page:receive',
    CHANGE: 'page:change',
    UPDATE: 'page:update',
    LOAD: 'page:load',
    RESTORE: 'page:restore',
    BEFORE_UNLOAD: 'page:before-unload',
    EXPIRE: 'page:expire'
  };

  fetch = function(url) {
    var cachedPage;
    url = new ComponentUrl(url);
    rememberReferer();
    cacheCurrentPage();
    if (progressBar != null) {
      progressBar.start();
    }
    if (transitionCacheEnabled && (cachedPage = transitionCacheFor(url.absolute))) {
      fetchHistory(cachedPage);
      return fetchReplacement(url, null, false);
    } else {
      return fetchReplacement(url, resetScrollPosition);
    }
  };

  transitionCacheFor = function(url) {
    var cachedPage;
    cachedPage = pageCache[url];
    if (cachedPage && !cachedPage.transitionCacheDisabled) {
      return cachedPage;
    }
  };

  enableTransitionCache = function(enable) {
    if (enable == null) {
      enable = true;
    }
    return transitionCacheEnabled = enable;
  };

  enableProgressBar = function(enable) {
    if (enable == null) {
      enable = true;
    }
    if (!browserSupportsTurbolinks) {
      return;
    }
    if (enable) {
      return progressBar != null ? progressBar : progressBar = new ProgressBar('html');
    } else {
      if (progressBar != null) {
        progressBar.uninstall();
      }
      return progressBar = null;
    }
  };

  fetchReplacement = function(url, onLoadFunction, showProgressBar) {
    if (showProgressBar == null) {
      showProgressBar = true;
    }
    triggerEvent(EVENTS.FETCH, {
      url: url.absolute
    });
    if (xhr != null) {
      xhr.abort();
    }
    xhr = new XMLHttpRequest;
    xhr.open('GET', url.withoutHashForIE10compatibility(), true);
    xhr.setRequestHeader('Accept', 'text/html, application/xhtml+xml, application/xml');
    xhr.setRequestHeader('X-XHR-Referer', referer);
    xhr.onload = function() {
      var doc;
      triggerEvent(EVENTS.RECEIVE, {
        url: url.absolute
      });
      if (doc = processResponse()) {
        reflectNewUrl(url);
        reflectRedirectedUrl();
        changePage.apply(null, extractTitleAndBody(doc));
        manuallyTriggerHashChangeForFirefox();
        if (typeof onLoadFunction === "function") {
          onLoadFunction();
        }
        return triggerEvent(EVENTS.LOAD);
      } else {
        return document.location.href = crossOriginRedirect() || url.absolute;
      }
    };
    if (progressBar && showProgressBar) {
      xhr.onprogress = (function(_this) {
        return function(event) {
          var percent;
          percent = event.lengthComputable ? event.loaded / event.total * 100 : progressBar.value + (100 - progressBar.value) / 10;
          return progressBar.advanceTo(percent);
        };
      })(this);
    }
    xhr.onloadend = function() {
      return xhr = null;
    };
    xhr.onerror = function() {
      return document.location.href = url.absolute;
    };
    return xhr.send();
  };

  fetchHistory = function(cachedPage) {
    if (xhr != null) {
      xhr.abort();
    }
    changePage(cachedPage.title, cachedPage.body);
    recallScrollPosition(cachedPage);
    return triggerEvent(EVENTS.RESTORE);
  };

  cacheCurrentPage = function() {
    var currentStateUrl;
    currentStateUrl = new ComponentUrl(currentState.url);
    pageCache[currentStateUrl.absolute] = {
      url: currentStateUrl.relative,
      body: document.body,
      title: document.title,
      positionY: window.pageYOffset,
      positionX: window.pageXOffset,
      cachedAt: new Date().getTime(),
      transitionCacheDisabled: document.querySelector('[data-no-transition-cache]') != null
    };
    return constrainPageCacheTo(cacheSize);
  };

  pagesCached = function(size) {
    if (size == null) {
      size = cacheSize;
    }
    if (/^[\d]+$/.test(size)) {
      return cacheSize = parseInt(size);
    }
  };

  constrainPageCacheTo = function(limit) {
    var cacheTimesRecentFirst, i, key, len, pageCacheKeys, results;
    pageCacheKeys = Object.keys(pageCache);
    cacheTimesRecentFirst = pageCacheKeys.map(function(url) {
      return pageCache[url].cachedAt;
    }).sort(function(a, b) {
      return b - a;
    });
    results = [];
    for (i = 0, len = pageCacheKeys.length; i < len; i++) {
      key = pageCacheKeys[i];
      if (!(pageCache[key].cachedAt <= cacheTimesRecentFirst[limit])) {
        continue;
      }
      triggerEvent(EVENTS.EXPIRE, pageCache[key]);
      results.push(delete pageCache[key]);
    }
    return results;
  };

  changePage = function(title, body, csrfToken, runScripts) {
    triggerEvent(EVENTS.BEFORE_UNLOAD);
    document.title = title;
    document.documentElement.replaceChild(body, document.body);
    if (csrfToken != null) {
      CSRFToken.update(csrfToken);
    }
    setAutofocusElement();
    if (runScripts) {
      executeScriptTags();
    }
    currentState = window.history.state;
    if (progressBar != null) {
      progressBar.done();
    }
    triggerEvent(EVENTS.CHANGE);
    return triggerEvent(EVENTS.UPDATE);
  };

  executeScriptTags = function() {
    var attr, copy, i, j, len, len1, nextSibling, parentNode, ref, ref1, script, scripts;
    scripts = Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])'));
    for (i = 0, len = scripts.length; i < len; i++) {
      script = scripts[i];
      if (!((ref = script.type) === '' || ref === 'text/javascript')) {
        continue;
      }
      copy = document.createElement('script');
      ref1 = script.attributes;
      for (j = 0, len1 = ref1.length; j < len1; j++) {
        attr = ref1[j];
        copy.setAttribute(attr.name, attr.value);
      }
      if (!script.hasAttribute('async')) {
        copy.async = false;
      }
      copy.appendChild(document.createTextNode(script.innerHTML));
      parentNode = script.parentNode, nextSibling = script.nextSibling;
      parentNode.removeChild(script);
      parentNode.insertBefore(copy, nextSibling);
    }
  };

  removeNoscriptTags = function(node) {
    node.innerHTML = node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/ig, '');
    return node;
  };

  setAutofocusElement = function() {
    var autofocusElement, list;
    autofocusElement = (list = document.querySelectorAll('input[autofocus], textarea[autofocus]'))[list.length - 1];
    if (autofocusElement && document.activeElement !== autofocusElement) {
      return autofocusElement.focus();
    }
  };

  reflectNewUrl = function(url) {
    if ((url = new ComponentUrl(url)).absolute !== referer) {
      return window.history.pushState({
        turbolinks: true,
        url: url.absolute
      }, '', url.absolute);
    }
  };

  reflectRedirectedUrl = function() {
    var location, preservedHash;
    if (location = xhr.getResponseHeader('X-XHR-Redirected-To')) {
      location = new ComponentUrl(location);
      preservedHash = location.hasNoHash() ? document.location.hash : '';
      return window.history.replaceState(window.history.state, '', location.href + preservedHash);
    }
  };

  crossOriginRedirect = function() {
    var redirect;
    if (((redirect = xhr.getResponseHeader('Location')) != null) && (new ComponentUrl(redirect)).crossOrigin()) {
      return redirect;
    }
  };

  rememberReferer = function() {
    return referer = document.location.href;
  };

  rememberCurrentUrl = function() {
    return window.history.replaceState({
      turbolinks: true,
      url: document.location.href
    }, '', document.location.href);
  };

  rememberCurrentState = function() {
    return currentState = window.history.state;
  };

  manuallyTriggerHashChangeForFirefox = function() {
    var url;
    if (navigator.userAgent.match(/Firefox/) && !(url = new ComponentUrl).hasNoHash()) {
      window.history.replaceState(currentState, '', url.withoutHash());
      return document.location.hash = url.hash;
    }
  };

  recallScrollPosition = function(page) {
    return window.scrollTo(page.positionX, page.positionY);
  };

  resetScrollPosition = function() {
    if (document.location.hash) {
      return document.location.href = document.location.href;
    } else {
      return window.scrollTo(0, 0);
    }
  };

  clone = function(original) {
    var copy, key, value;
    if ((original == null) || typeof original !== 'object') {
      return original;
    }
    copy = new original.constructor();
    for (key in original) {
      value = original[key];
      copy[key] = clone(value);
    }
    return copy;
  };

  popCookie = function(name) {
    var ref, value;
    value = ((ref = document.cookie.match(new RegExp(name + "=(\\w+)"))) != null ? ref[1].toUpperCase() : void 0) || '';
    document.cookie = name + '=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/';
    return value;
  };

  triggerEvent = function(name, data) {
    var event;
    if (typeof Prototype !== 'undefined') {
      Event.fire(document, name, data, true);
    }
    event = document.createEvent('Events');
    if (data) {
      event.data = data;
    }
    event.initEvent(name, true, true);
    return document.dispatchEvent(event);
  };

  pageChangePrevented = function(url) {
    return !triggerEvent(EVENTS.BEFORE_CHANGE, {
      url: url
    });
  };

  processResponse = function() {
    var assetsChanged, clientOrServerError, doc, extractTrackAssets, intersection, validContent;
    clientOrServerError = function() {
      var ref;
      return (400 <= (ref = xhr.status) && ref < 600);
    };
    validContent = function() {
      var contentType;
      return ((contentType = xhr.getResponseHeader('Content-Type')) != null) && contentType.match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/);
    };
    extractTrackAssets = function(doc) {
      var i, len, node, ref, results;
      ref = doc.querySelector('head').childNodes;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        node = ref[i];
        if ((typeof node.getAttribute === "function" ? node.getAttribute('data-turbolinks-track') : void 0) != null) {
          results.push(node.getAttribute('src') || node.getAttribute('href'));
        }
      }
      return results;
    };
    assetsChanged = function(doc) {
      var fetchedAssets;
      loadedAssets || (loadedAssets = extractTrackAssets(document));
      fetchedAssets = extractTrackAssets(doc);
      return fetchedAssets.length !== loadedAssets.length || intersection(fetchedAssets, loadedAssets).length !== loadedAssets.length;
    };
    intersection = function(a, b) {
      var i, len, ref, results, value;
      if (a.length > b.length) {
        ref = [b, a], a = ref[0], b = ref[1];
      }
      results = [];
      for (i = 0, len = a.length; i < len; i++) {
        value = a[i];
        if (indexOf.call(b, value) >= 0) {
          results.push(value);
        }
      }
      return results;
    };
    if (!clientOrServerError() && validContent()) {
      doc = createDocument(xhr.responseText);
      if (doc && !assetsChanged(doc)) {
        return doc;
      }
    }
  };

  extractTitleAndBody = function(doc) {
    var title;
    title = doc.querySelector('title');
    return [title != null ? title.textContent : void 0, removeNoscriptTags(doc.querySelector('body')), CSRFToken.get(doc).token, 'runScripts'];
  };

  CSRFToken = {
    get: function(doc) {
      var tag;
      if (doc == null) {
        doc = document;
      }
      return {
        node: tag = doc.querySelector('meta[name="csrf-token"]'),
        token: tag != null ? typeof tag.getAttribute === "function" ? tag.getAttribute('content') : void 0 : void 0
      };
    },
    update: function(latest) {
      var current;
      current = this.get();
      if ((current.token != null) && (latest != null) && current.token !== latest) {
        return current.node.setAttribute('content', latest);
      }
    }
  };

  createDocument = function(html) {
    var doc;
    doc = document.documentElement.cloneNode();
    doc.innerHTML = html;
    doc.head = doc.querySelector('head');
    doc.body = doc.querySelector('body');
    return doc;
  };

  ComponentUrl = (function() {
    function ComponentUrl(original1) {
      this.original = original1 != null ? original1 : document.location.href;
      if (this.original.constructor === ComponentUrl) {
        return this.original;
      }
      this._parse();
    }

    ComponentUrl.prototype.withoutHash = function() {
      return this.href.replace(this.hash, '').replace('#', '');
    };

    ComponentUrl.prototype.withoutHashForIE10compatibility = function() {
      return this.withoutHash();
    };

    ComponentUrl.prototype.hasNoHash = function() {
      return this.hash.length === 0;
    };

    ComponentUrl.prototype.crossOrigin = function() {
      return this.origin !== (new ComponentUrl).origin;
    };

    ComponentUrl.prototype._parse = function() {
      var ref;
      (this.link != null ? this.link : this.link = document.createElement('a')).href = this.original;
      ref = this.link, this.href = ref.href, this.protocol = ref.protocol, this.host = ref.host, this.hostname = ref.hostname, this.port = ref.port, this.pathname = ref.pathname, this.search = ref.search, this.hash = ref.hash;
      this.origin = [this.protocol, '//', this.hostname].join('');
      if (this.port.length !== 0) {
        this.origin += ":" + this.port;
      }
      this.relative = [this.pathname, this.search, this.hash].join('');
      return this.absolute = this.href;
    };

    return ComponentUrl;

  })();

  Link = (function(superClass) {
    extend(Link, superClass);

    Link.HTML_EXTENSIONS = ['html'];

    Link.allowExtensions = function() {
      var extension, extensions, i, len;
      extensions = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      for (i = 0, len = extensions.length; i < len; i++) {
        extension = extensions[i];
        Link.HTML_EXTENSIONS.push(extension);
      }
      return Link.HTML_EXTENSIONS;
    };

    function Link(link1) {
      this.link = link1;
      if (this.link.constructor === Link) {
        return this.link;
      }
      this.original = this.link.href;
      this.originalElement = this.link;
      this.link = this.link.cloneNode(false);
      Link.__super__.constructor.apply(this, arguments);
    }

    Link.prototype.shouldIgnore = function() {
      return this.crossOrigin() || this._anchored() || this._nonHtml() || this._optOut() || this._target();
    };

    Link.prototype._anchored = function() {
      return (this.hash.length > 0 || this.href.charAt(this.href.length - 1) === '#') && (this.withoutHash() === (new ComponentUrl).withoutHash());
    };

    Link.prototype._nonHtml = function() {
      return this.pathname.match(/\.[a-z]+$/g) && !this.pathname.match(new RegExp("\\.(?:" + (Link.HTML_EXTENSIONS.join('|')) + ")?$", 'g'));
    };

    Link.prototype._optOut = function() {
      var ignore, link;
      link = this.originalElement;
      while (!(ignore || link === document)) {
        ignore = link.getAttribute('data-no-turbolink') != null;
        link = link.parentNode;
      }
      return ignore;
    };

    Link.prototype._target = function() {
      return this.link.target.length !== 0;
    };

    return Link;

  })(ComponentUrl);

  Click = (function() {
    Click.installHandlerLast = function(event) {
      if (!event.defaultPrevented) {
        document.removeEventListener('click', Click.handle, false);
        return document.addEventListener('click', Click.handle, false);
      }
    };

    Click.handle = function(event) {
      return new Click(event);
    };

    function Click(event1) {
      this.event = event1;
      if (this.event.defaultPrevented) {
        return;
      }
      this._extractLink();
      if (this._validForTurbolinks()) {
        if (!pageChangePrevented(this.link.absolute)) {
          visit(this.link.href);
        }
        this.event.preventDefault();
      }
    }

    Click.prototype._extractLink = function() {
      var link;
      link = this.event.target;
      while (!(!link.parentNode || link.nodeName === 'A')) {
        link = link.parentNode;
      }
      if (link.nodeName === 'A' && link.href.length !== 0) {
        return this.link = new Link(link);
      }
    };

    Click.prototype._validForTurbolinks = function() {
      return (this.link != null) && !(this.link.shouldIgnore() || this._nonStandardClick());
    };

    Click.prototype._nonStandardClick = function() {
      return this.event.which > 1 || this.event.metaKey || this.event.ctrlKey || this.event.shiftKey || this.event.altKey;
    };

    return Click;

  })();

  ProgressBar = (function() {
    var className;

    className = 'turbolinks-progress-bar';

    function ProgressBar(elementSelector) {
      this.elementSelector = elementSelector;
      this._trickle = bind(this._trickle, this);
      this.value = 0;
      this.content = '';
      this.speed = 300;
      this.opacity = 0.99;
      this.install();
    }

    ProgressBar.prototype.install = function() {
      this.element = document.querySelector(this.elementSelector);
      this.element.classList.add(className);
      this.styleElement = document.createElement('style');
      document.head.appendChild(this.styleElement);
      return this._updateStyle();
    };

    ProgressBar.prototype.uninstall = function() {
      this.element.classList.remove(className);
      return document.head.removeChild(this.styleElement);
    };

    ProgressBar.prototype.start = function() {
      return this.advanceTo(5);
    };

    ProgressBar.prototype.advanceTo = function(value) {
      var ref;
      if ((value > (ref = this.value) && ref <= 100)) {
        this.value = value;
        this._updateStyle();
        if (this.value === 100) {
          return this._stopTrickle();
        } else if (this.value > 0) {
          return this._startTrickle();
        }
      }
    };

    ProgressBar.prototype.done = function() {
      if (this.value > 0) {
        this.advanceTo(100);
        return this._reset();
      }
    };

    ProgressBar.prototype._reset = function() {
      var originalOpacity;
      originalOpacity = this.opacity;
      setTimeout((function(_this) {
        return function() {
          _this.opacity = 0;
          return _this._updateStyle();
        };
      })(this), this.speed / 2);
      return setTimeout((function(_this) {
        return function() {
          _this.value = 0;
          _this.opacity = originalOpacity;
          return _this._withSpeed(0, function() {
            return _this._updateStyle(true);
          });
        };
      })(this), this.speed);
    };

    ProgressBar.prototype._startTrickle = function() {
      if (this.trickling) {
        return;
      }
      this.trickling = true;
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._stopTrickle = function() {
      return delete this.trickling;
    };

    ProgressBar.prototype._trickle = function() {
      if (!this.trickling) {
        return;
      }
      this.advanceTo(this.value + Math.random() / 2);
      return setTimeout(this._trickle, this.speed);
    };

    ProgressBar.prototype._withSpeed = function(speed, fn) {
      var originalSpeed, result;
      originalSpeed = this.speed;
      this.speed = speed;
      result = fn();
      this.speed = originalSpeed;
      return result;
    };

    ProgressBar.prototype._updateStyle = function(forceRepaint) {
      if (forceRepaint == null) {
        forceRepaint = false;
      }
      if (forceRepaint) {
        this._changeContentToForceRepaint();
      }
      return this.styleElement.textContent = this._createCSSRule();
    };

    ProgressBar.prototype._changeContentToForceRepaint = function() {
      return this.content = this.content === '' ? ' ' : '';
    };

    ProgressBar.prototype._createCSSRule = function() {
      return this.elementSelector + "." + className + "::before {\n  content: '" + this.content + "';\n  position: fixed;\n  top: 0;\n  left: 0;\n  z-index: 2000;\n  background-color: #0076ff;\n  height: 3px;\n  opacity: " + this.opacity + ";\n  width: " + this.value + "%;\n  transition: width " + this.speed + "ms ease-out, opacity " + (this.speed / 2) + "ms ease-in;\n  transform: translate3d(0,0,0);\n}";
    };

    return ProgressBar;

  })();

  bypassOnLoadPopstate = function(fn) {
    return setTimeout(fn, 500);
  };

  installDocumentReadyPageEventTriggers = function() {
    return document.addEventListener('DOMContentLoaded', (function() {
      triggerEvent(EVENTS.CHANGE);
      return triggerEvent(EVENTS.UPDATE);
    }), true);
  };

  installJqueryAjaxSuccessPageUpdateTrigger = function() {
    if (typeof jQuery !== 'undefined') {
      return jQuery(document).on('ajaxSuccess', function(event, xhr, settings) {
        if (!jQuery.trim(xhr.responseText)) {
          return;
        }
        return triggerEvent(EVENTS.UPDATE);
      });
    }
  };

  installHistoryChangeHandler = function(event) {
    var cachedPage, ref;
    if ((ref = event.state) != null ? ref.turbolinks : void 0) {
      if (cachedPage = pageCache[(new ComponentUrl(event.state.url)).absolute]) {
        cacheCurrentPage();
        return fetchHistory(cachedPage);
      } else {
        return visit(event.target.location.href);
      }
    }
  };

  initializeTurbolinks = function() {
    rememberCurrentUrl();
    rememberCurrentState();
    document.addEventListener('click', Click.installHandlerLast, true);
    window.addEventListener('hashchange', function(event) {
      rememberCurrentUrl();
      return rememberCurrentState();
    }, false);
    return bypassOnLoadPopstate(function() {
      return window.addEventListener('popstate', installHistoryChangeHandler, false);
    });
  };

  historyStateIsDefined = window.history.state !== void 0 || navigator.userAgent.match(/Firefox\/2[6|7]/);

  browserSupportsPushState = window.history && window.history.pushState && window.history.replaceState && historyStateIsDefined;

  browserIsntBuggy = !navigator.userAgent.match(/CriOS\//);

  requestMethodIsSafe = (ref = popCookie('request_method')) === 'GET' || ref === '';

  browserSupportsTurbolinks = browserSupportsPushState && browserIsntBuggy && requestMethodIsSafe;

  browserSupportsCustomEvents = document.addEventListener && document.createEvent;

  if (browserSupportsCustomEvents) {
    installDocumentReadyPageEventTriggers();
    installJqueryAjaxSuccessPageUpdateTrigger();
  }

  if (browserSupportsTurbolinks) {
    visit = fetch;
    initializeTurbolinks();
  } else {
    visit = function(url) {
      return document.location.href = url;
    };
  }

  this.Turbolinks = {
    visit: visit,
    pagesCached: pagesCached,
    enableTransitionCache: enableTransitionCache,
    enableProgressBar: enableProgressBar,
    allowLinkExtensions: Link.allowExtensions,
    supported: browserSupportsTurbolinks,
    EVENTS: clone(EVENTS)
  };

}).call(this);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.4
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.4'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.4
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.4'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.4
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.4'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked') && this.$element.hasClass('active')) changed = false
        else $parent.find('.active').removeClass('active')
      }
      if (changed) $input.prop('checked', !this.$element.hasClass('active')).trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
    }

    if (changed) this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.4
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.4'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = $(document.body).height()

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.4
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    this.element = $(element)
  }

  Tab.VERSION = '3.3.4'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && (($active.length && $active.hasClass('fade')) || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.4
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.4'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: transition.js v3.3.4
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.4
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.4'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $(this.options.viewport.selector || this.options.viewport)

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (self && self.$tip && self.$tip.is(':visible')) {
      self.hoverState = 'in'
      return
    }

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var $container   = this.options.container ? $(this.options.container) : this.$element.parent()
        var containerDim = this.getPosition($container)

        placement = placement == 'bottom' && pos.bottom + actualHeight > containerDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < containerDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > containerDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < containerDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  = offset.top  + marginTop
    offset.left = offset.left + marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof ($e.attr('data-original-title')) != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.width) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    return (this.$tip = this.$tip || $(this.options.template))
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.4
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.4'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.4
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.4'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.4
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.4'

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown', relatedTarget)
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if ((!isActive && e.which != 27) || (isActive && e.which == 27)) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('[role="menu"]' + desc + ', [role="listbox"]' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--                        // up
    if (e.which == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index = 0

    $items.eq(index).trigger('focus')
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger('hidden.bs.dropdown', relatedTarget)
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="menu"]', Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '[role="listbox"]', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.4
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.4'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);












/**
 * jQuery Geocoding and Places Autocomplete Plugin - V 1.7.0
 *
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2016
 * @author Ubilabs http://ubilabs.net, 2016
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */

(function($,window,document,undefined){var defaults={bounds:true,country:null,map:false,details:false,detailsAttribute:"name",detailsScope:null,autoselect:true,location:false,mapOptions:{zoom:14,scrollwheel:false,mapTypeId:"roadmap"},markerOptions:{draggable:false},maxZoom:16,types:["geocode"],blur:false,geocodeAfterResult:false,restoreValueAfterBlur:false};var componentTypes=("street_address route intersection political "+"country administrative_area_level_1 administrative_area_level_2 "+"administrative_area_level_3 colloquial_area locality sublocality "+"neighborhood premise subpremise postal_code natural_feature airport "+"park point_of_interest post_box street_number floor room "+"lat lng viewport location "+"formatted_address location_type bounds").split(" ");var placesDetails=("id place_id url website vicinity reference name rating "+"international_phone_number icon formatted_phone_number").split(" ");function GeoComplete(input,options){this.options=$.extend(true,{},defaults,options);if(options&&options.types){this.options.types=options.types}this.input=input;this.$input=$(input);this._defaults=defaults;this._name="geocomplete";this.init()}$.extend(GeoComplete.prototype,{init:function(){this.initMap();this.initMarker();this.initGeocoder();this.initDetails();this.initLocation()},initMap:function(){if(!this.options.map){return}if(typeof this.options.map.setCenter=="function"){this.map=this.options.map;return}this.map=new google.maps.Map($(this.options.map)[0],this.options.mapOptions);google.maps.event.addListener(this.map,"click",$.proxy(this.mapClicked,this));google.maps.event.addListener(this.map,"dragend",$.proxy(this.mapDragged,this));google.maps.event.addListener(this.map,"idle",$.proxy(this.mapIdle,this));google.maps.event.addListener(this.map,"zoom_changed",$.proxy(this.mapZoomed,this))},initMarker:function(){if(!this.map){return}var options=$.extend(this.options.markerOptions,{map:this.map});if(options.disabled){return}this.marker=new google.maps.Marker(options);google.maps.event.addListener(this.marker,"dragend",$.proxy(this.markerDragged,this))},initGeocoder:function(){var selected=false;var options={types:this.options.types,bounds:this.options.bounds===true?null:this.options.bounds,componentRestrictions:this.options.componentRestrictions};if(this.options.country){options.componentRestrictions={country:this.options.country}}this.autocomplete=new google.maps.places.Autocomplete(this.input,options);this.geocoder=new google.maps.Geocoder;if(this.map&&this.options.bounds===true){this.autocomplete.bindTo("bounds",this.map)}google.maps.event.addListener(this.autocomplete,"place_changed",$.proxy(this.placeChanged,this));this.$input.on("keypress."+this._name,function(event){if(event.keyCode===13){return false}});if(this.options.geocodeAfterResult===true){this.$input.bind("keypress."+this._name,$.proxy(function(){if(event.keyCode!=9&&this.selected===true){this.selected=false}},this))}this.$input.bind("geocode."+this._name,$.proxy(function(){this.find()},this));this.$input.bind("geocode:result."+this._name,$.proxy(function(){this.lastInputVal=this.$input.val()},this));if(this.options.blur===true){this.$input.on("blur."+this._name,$.proxy(function(){if(this.options.geocodeAfterResult===true&&this.selected===true){return}if(this.options.restoreValueAfterBlur===true&&this.selected===true){setTimeout($.proxy(this.restoreLastValue,this),0)}else{this.find()}},this))}},initDetails:function(){if(!this.options.details){return}if(this.options.detailsScope){var $details=$(this.input).parents(this.options.detailsScope).find(this.options.details)}else{var $details=$(this.options.details)}var attribute=this.options.detailsAttribute,details={};function setDetail(value){details[value]=$details.find("["+attribute+"="+value+"]")}$.each(componentTypes,function(index,key){setDetail(key);setDetail(key+"_short")});$.each(placesDetails,function(index,key){setDetail(key)});this.$details=$details;this.details=details},initLocation:function(){var location=this.options.location,latLng;if(!location){return}if(typeof location=="string"){this.find(location);return}if(location instanceof Array){latLng=new google.maps.LatLng(location[0],location[1])}if(location instanceof google.maps.LatLng){latLng=location}if(latLng){if(this.map){this.map.setCenter(latLng)}if(this.marker){this.marker.setPosition(latLng)}}},destroy:function(){if(this.map){google.maps.event.clearInstanceListeners(this.map);google.maps.event.clearInstanceListeners(this.marker)}this.autocomplete.unbindAll();google.maps.event.clearInstanceListeners(this.autocomplete);google.maps.event.clearInstanceListeners(this.input);this.$input.removeData();this.$input.off(this._name);this.$input.unbind("."+this._name)},find:function(address){this.geocode({address:address||this.$input.val()})},geocode:function(request){if(!request.address){return}if(this.options.bounds&&!request.bounds){if(this.options.bounds===true){request.bounds=this.map&&this.map.getBounds()}else{request.bounds=this.options.bounds}}if(this.options.country){request.region=this.options.country}this.geocoder.geocode(request,$.proxy(this.handleGeocode,this))},selectFirstResult:function(){var selected="";if($(".pac-item-selected")[0]){selected="-selected"}var $span1=$(".pac-container:visible .pac-item"+selected+":first span:nth-child(2)").text();var $span2=$(".pac-container:visible .pac-item"+selected+":first span:nth-child(3)").text();var firstResult=$span1;if($span2){firstResult+=" - "+$span2}this.$input.val(firstResult);return firstResult},restoreLastValue:function(){if(this.lastInputVal){this.$input.val(this.lastInputVal)}},handleGeocode:function(results,status){if(status===google.maps.GeocoderStatus.OK){var result=results[0];this.$input.val(result.formatted_address);this.update(result);if(results.length>1){this.trigger("geocode:multiple",results)}}else{this.trigger("geocode:error",status)}},trigger:function(event,argument){this.$input.trigger(event,[argument])},center:function(geometry){if(geometry.viewport){this.map.fitBounds(geometry.viewport);if(this.map.getZoom()>this.options.maxZoom){this.map.setZoom(this.options.maxZoom)}}else{this.map.setZoom(this.options.maxZoom);this.map.setCenter(geometry.location)}if(this.marker){this.marker.setPosition(geometry.location);this.marker.setAnimation(this.options.markerOptions.animation)}},update:function(result){if(this.map){this.center(result.geometry)}if(this.$details){this.fillDetails(result)}this.trigger("geocode:result",result)},fillDetails:function(result){var data={},geometry=result.geometry,viewport=geometry.viewport,bounds=geometry.bounds;$.each(result.address_components,function(index,object){var name=object.types[0];$.each(object.types,function(index,name){data[name]=object.long_name;data[name+"_short"]=object.short_name})});$.each(placesDetails,function(index,key){data[key]=result[key]});$.extend(data,{formatted_address:result.formatted_address,location_type:geometry.location_type||"PLACES",viewport:viewport,bounds:bounds,location:geometry.location,lat:geometry.location.lat(),lng:geometry.location.lng()});$.each(this.details,$.proxy(function(key,$detail){var value=data[key];this.setDetail($detail,value)},this));this.data=data},setDetail:function($element,value){if(value===undefined){value=""}else if(typeof value.toUrlValue=="function"){value=value.toUrlValue()}if($element.is(":input")){$element.val(value)}else{$element.text(value)}},markerDragged:function(event){this.trigger("geocode:dragged",event.latLng)},mapClicked:function(event){this.trigger("geocode:click",event.latLng)},mapDragged:function(event){this.trigger("geocode:mapdragged",this.map.getCenter())},mapIdle:function(event){this.trigger("geocode:idle",this.map.getCenter())},mapZoomed:function(event){this.trigger("geocode:zoom",this.map.getZoom())},resetMarker:function(){this.marker.setPosition(this.data.location);this.setDetail(this.details.lat,this.data.location.lat());this.setDetail(this.details.lng,this.data.location.lng())},placeChanged:function(){var place=this.autocomplete.getPlace();this.selected=true;if(!place.geometry){if(this.options.autoselect){var autoSelection=this.selectFirstResult();this.find(autoSelection)}}else{this.update(place)}}});$.fn.geocomplete=function(options){var attribute="plugin_geocomplete";if(typeof options=="string"){var instance=$(this).data(attribute)||$(this).geocomplete().data(attribute),prop=instance[options];if(typeof prop=="function"){prop.apply(instance,Array.prototype.slice.call(arguments,1));return $(this)}else{if(arguments.length==2){prop=arguments[1]}return prop}}else{return this.each(function(){var instance=$.data(this,attribute);if(!instance){instance=new GeoComplete(this,options);$.data(this,attribute,instance)}})}}})(jQuery,window,document);
/*!
 * jQuery JavaScript Library v1.7.2
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Wed Mar 21 12:46:34 2012 -0700
 */

;(function(bd,L){var av=bd.document,bu=bd.navigator,bm=bd.location;var b=(function(){var bF=function(b0,b1){return new bF.fn.init(b0,b1,bD);},bU=bd.jQuery,bH=bd.$,bD,bY=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,bM=/\S/,bI=/^\s+/,bE=/\s+$/,bA=/^<(\w+)\s*\/?>(?:<\/\1>)?$/,bN=/^[\],:{}\s]*$/,bW=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,bP=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,bJ=/(?:^|:|,)(?:\s*\[)+/g,by=/(webkit)[ \/]([\w.]+)/,bR=/(opera)(?:.*version)?[ \/]([\w.]+)/,bQ=/(msie) ([\w.]+)/,bS=/(mozilla)(?:.*? rv:([\w.]+))?/,bB=/-([a-z]|[0-9])/ig,bZ=/^-ms-/,bT=function(b0,b1){return(b1+"").toUpperCase();},bX=bu.userAgent,bV,bC,e,bL=Object.prototype.toString,bG=Object.prototype.hasOwnProperty,bz=Array.prototype.push,bK=Array.prototype.slice,bO=String.prototype.trim,bv=Array.prototype.indexOf,bx={};bF.fn=bF.prototype={constructor:bF,init:function(b0,b4,b3){var b2,b5,b1,b6;if(!b0){return this;}if(b0.nodeType){this.context=this[0]=b0;this.length=1;return this;}if(b0==="body"&&!b4&&av.body){this.context=av;this[0]=av.body;this.selector=b0;this.length=1;return this;}if(typeof b0==="string"){if(b0.charAt(0)==="<"&&b0.charAt(b0.length-1)===">"&&b0.length>=3){b2=[null,b0,null];}else{b2=bY.exec(b0);}if(b2&&(b2[1]||!b4)){if(b2[1]){b4=b4 instanceof bF?b4[0]:b4;b6=(b4?b4.ownerDocument||b4:av);b1=bA.exec(b0);if(b1){if(bF.isPlainObject(b4)){b0=[av.createElement(b1[1])];bF.fn.attr.call(b0,b4,true);}else{b0=[b6.createElement(b1[1])];}}else{b1=bF.buildFragment([b2[1]],[b6]);b0=(b1.cacheable?bF.clone(b1.fragment):b1.fragment).childNodes;}return bF.merge(this,b0);}else{b5=av.getElementById(b2[2]);if(b5&&b5.parentNode){if(b5.id!==b2[2]){return b3.find(b0);}this.length=1;this[0]=b5;}this.context=av;this.selector=b0;return this;}}else{if(!b4||b4.jquery){return(b4||b3).find(b0);}else{return this.constructor(b4).find(b0);}}}else{if(bF.isFunction(b0)){return b3.ready(b0);}}if(b0.selector!==L){this.selector=b0.selector;this.context=b0.context;}return bF.makeArray(b0,this);},selector:"",jquery:"1.7.2",length:0,size:function(){return this.length;},toArray:function(){return bK.call(this,0);},get:function(b0){return b0==null?this.toArray():(b0<0?this[this.length+b0]:this[b0]);},pushStack:function(b1,b3,b0){var b2=this.constructor();if(bF.isArray(b1)){bz.apply(b2,b1);}else{bF.merge(b2,b1);}b2.prevObject=this;b2.context=this.context;if(b3==="find"){b2.selector=this.selector+(this.selector?" ":"")+b0;}else{if(b3){b2.selector=this.selector+"."+b3+"("+b0+")";}}return b2;},each:function(b1,b0){return bF.each(this,b1,b0);},ready:function(b0){bF.bindReady();bC.add(b0);return this;},eq:function(b0){b0=+b0;return b0===-1?this.slice(b0):this.slice(b0,b0+1);},first:function(){return this.eq(0);},last:function(){return this.eq(-1);},slice:function(){return this.pushStack(bK.apply(this,arguments),"slice",bK.call(arguments).join(","));},map:function(b0){return this.pushStack(bF.map(this,function(b2,b1){return b0.call(b2,b1,b2);}));},end:function(){return this.prevObject||this.constructor(null);},push:bz,sort:[].sort,splice:[].splice};bF.fn.init.prototype=bF.fn;bF.extend=bF.fn.extend=function(){var b9,b2,b0,b1,b6,b7,b5=arguments[0]||{},b4=1,b3=arguments.length,b8=false;if(typeof b5==="boolean"){b8=b5;b5=arguments[1]||{};b4=2;}if(typeof b5!=="object"&&!bF.isFunction(b5)){b5={};}if(b3===b4){b5=this;--b4;}for(;b4<b3;b4++){if((b9=arguments[b4])!=null){for(b2 in b9){b0=b5[b2];b1=b9[b2];if(b5===b1){continue;}if(b8&&b1&&(bF.isPlainObject(b1)||(b6=bF.isArray(b1)))){if(b6){b6=false;b7=b0&&bF.isArray(b0)?b0:[];}else{b7=b0&&bF.isPlainObject(b0)?b0:{};}b5[b2]=bF.extend(b8,b7,b1);}else{if(b1!==L){b5[b2]=b1;}}}}}return b5;};bF.extend({noConflict:function(b0){if(bd.$===bF){bd.$=bH;}if(b0&&bd.jQuery===bF){bd.jQuery=bU;}return bF;},isReady:false,readyWait:1,holdReady:function(b0){if(b0){bF.readyWait++;}else{bF.ready(true);}},ready:function(b0){if((b0===true&&!--bF.readyWait)||(b0!==true&&!bF.isReady)){if(!av.body){return setTimeout(bF.ready,1);}bF.isReady=true;if(b0!==true&&--bF.readyWait>0){return;}bC.fireWith(av,[bF]);if(bF.fn.trigger){bF(av).trigger("ready").off("ready");}}},bindReady:function(){if(bC){return;}bC=bF.Callbacks("once memory");if(av.readyState==="complete"){return setTimeout(bF.ready,1);}if(av.addEventListener){av.addEventListener("DOMContentLoaded",e,false);bd.addEventListener("load",bF.ready,false);}else{if(av.attachEvent){av.attachEvent("onreadystatechange",e);bd.attachEvent("onload",bF.ready);var b0=false;try{b0=bd.frameElement==null;}catch(b1){}if(av.documentElement.doScroll&&b0){bw();}}}},isFunction:function(b0){return bF.type(b0)==="function";},isArray:Array.isArray||function(b0){return bF.type(b0)==="array";},isWindow:function(b0){return b0!=null&&b0==b0.window;},isNumeric:function(b0){return !isNaN(parseFloat(b0))&&isFinite(b0);},type:function(b0){return b0==null?String(b0):bx[bL.call(b0)]||"object";},isPlainObject:function(b2){if(!b2||bF.type(b2)!=="object"||b2.nodeType||bF.isWindow(b2)){return false;}try{if(b2.constructor&&!bG.call(b2,"constructor")&&!bG.call(b2.constructor.prototype,"isPrototypeOf")){return false;}}catch(b1){return false;}var b0;for(b0 in b2){}return b0===L||bG.call(b2,b0);},isEmptyObject:function(b1){for(var b0 in b1){return false;}return true;},error:function(b0){throw new Error(b0);},parseJSON:function(b0){if(typeof b0!=="string"||!b0){return null;}b0=bF.trim(b0);if(bd.JSON&&bd.JSON.parse){return bd.JSON.parse(b0);}if(bN.test(b0.replace(bW,"@").replace(bP,"]").replace(bJ,""))){return(new Function("return "+b0))();}bF.error("Invalid JSON: "+b0);},parseXML:function(b2){if(typeof b2!=="string"||!b2){return null;}var b0,b1;try{if(bd.DOMParser){b1=new DOMParser();b0=b1.parseFromString(b2,"text/xml");}else{b0=new ActiveXObject("Microsoft.XMLDOM");b0.async="false";b0.loadXML(b2);}}catch(b3){b0=L;}if(!b0||!b0.documentElement||b0.getElementsByTagName("parsererror").length){bF.error("Invalid XML: "+b2);}return b0;},noop:function(){},globalEval:function(b0){if(b0&&bM.test(b0)){(bd.execScript||function(b1){bd["eval"].call(bd,b1);})(b0);}},camelCase:function(b0){return b0.replace(bZ,"ms-").replace(bB,bT);},nodeName:function(b1,b0){return b1.nodeName&&b1.nodeName.toUpperCase()===b0.toUpperCase();},each:function(b3,b6,b2){var b1,b4=0,b5=b3.length,b0=b5===L||bF.isFunction(b3);if(b2){if(b0){for(b1 in b3){if(b6.apply(b3[b1],b2)===false){break;}}}else{for(;b4<b5;){if(b6.apply(b3[b4++],b2)===false){break;}}}}else{if(b0){for(b1 in b3){if(b6.call(b3[b1],b1,b3[b1])===false){break;}}}else{for(;b4<b5;){if(b6.call(b3[b4],b4,b3[b4++])===false){break;}}}}return b3;},trim:bO?function(b0){return b0==null?"":bO.call(b0);}:function(b0){return b0==null?"":b0.toString().replace(bI,"").replace(bE,"");},makeArray:function(b3,b1){var b0=b1||[];if(b3!=null){var b2=bF.type(b3);if(b3.length==null||b2==="string"||b2==="function"||b2==="regexp"||bF.isWindow(b3)){bz.call(b0,b3);}else{bF.merge(b0,b3);}}return b0;},inArray:function(b2,b3,b1){var b0;if(b3){if(bv){return bv.call(b3,b2,b1);}b0=b3.length;b1=b1?b1<0?Math.max(0,b0+b1):b1:0;for(;b1<b0;b1++){if(b1 in b3&&b3[b1]===b2){return b1;}}}return -1;},merge:function(b4,b2){var b3=b4.length,b1=0;if(typeof b2.length==="number"){for(var b0=b2.length;b1<b0;b1++){b4[b3++]=b2[b1];}}else{while(b2[b1]!==L){b4[b3++]=b2[b1++];}}b4.length=b3;return b4;},grep:function(b1,b6,b0){var b2=[],b5;b0=!!b0;for(var b3=0,b4=b1.length;b3<b4;b3++){b5=!!b6(b1[b3],b3);if(b0!==b5){b2.push(b1[b3]);}}return b2;},map:function(b0,b7,b8){var b5,b6,b4=[],b2=0,b1=b0.length,b3=b0 instanceof bF||b1!==L&&typeof b1==="number"&&((b1>0&&b0[0]&&b0[b1-1])||b1===0||bF.isArray(b0));if(b3){for(;b2<b1;b2++){b5=b7(b0[b2],b2,b8);if(b5!=null){b4[b4.length]=b5;}}}else{for(b6 in b0){b5=b7(b0[b6],b6,b8);if(b5!=null){b4[b4.length]=b5;}}}return b4.concat.apply([],b4);},guid:1,proxy:function(b4,b3){if(typeof b3==="string"){var b2=b4[b3];b3=b4;b4=b2;}if(!bF.isFunction(b4)){return L;}var b0=bK.call(arguments,2),b1=function(){return b4.apply(b3,b0.concat(bK.call(arguments)));};b1.guid=b4.guid=b4.guid||b1.guid||bF.guid++;return b1;},access:function(b0,b6,b9,b7,b4,ca,b8){var b2,b5=b9==null,b3=0,b1=b0.length;if(b9&&typeof b9==="object"){for(b3 in b9){bF.access(b0,b6,b3,b9[b3],1,ca,b7);}b4=1;}else{if(b7!==L){b2=b8===L&&bF.isFunction(b7);if(b5){if(b2){b2=b6;b6=function(cc,cb,cd){return b2.call(bF(cc),cd);};}else{b6.call(b0,b7);b6=null;}}if(b6){for(;b3<b1;b3++){b6(b0[b3],b9,b2?b7.call(b0[b3],b3,b6(b0[b3],b9)):b7,b8);}}b4=1;}}return b4?b0:b5?b6.call(b0):b1?b6(b0[0],b9):ca;},now:function(){return(new Date()).getTime();},uaMatch:function(b1){b1=b1.toLowerCase();var b0=by.exec(b1)||bR.exec(b1)||bQ.exec(b1)||b1.indexOf("compatible")<0&&bS.exec(b1)||[];return{browser:b0[1]||"",version:b0[2]||"0"};},sub:function(){function b0(b3,b4){return new b0.fn.init(b3,b4);}bF.extend(true,b0,this);b0.superclass=this;b0.fn=b0.prototype=this();b0.fn.constructor=b0;b0.sub=this.sub;b0.fn.init=function b2(b3,b4){if(b4&&b4 instanceof bF&&!(b4 instanceof b0)){b4=b0(b4);}return bF.fn.init.call(this,b3,b4,b1);};b0.fn.init.prototype=b0.fn;var b1=b0(av);return b0;},browser:{}});bF.each("Boolean Number String Function Array Date RegExp Object".split(" "),function(b1,b0){bx["[object "+b0+"]"]=b0.toLowerCase();});bV=bF.uaMatch(bX);if(bV.browser){bF.browser[bV.browser]=true;bF.browser.version=bV.version;}if(bF.browser.webkit){bF.browser.safari=true;}if(bM.test("\xA0")){bI=/^[\s\xA0]+/;bE=/[\s\xA0]+$/;}bD=bF(av);if(av.addEventListener){e=function(){av.removeEventListener("DOMContentLoaded",e,false);bF.ready();};}else{if(av.attachEvent){e=function(){if(av.readyState==="complete"){av.detachEvent("onreadystatechange",e);bF.ready();}};}}function bw(){if(bF.isReady){return;}try{av.documentElement.doScroll("left");}catch(b0){setTimeout(bw,1);return;}bF.ready();}return bF;})();var a3={};function X(e){var bv=a3[e]={},bw,bx;e=e.split(/\s+/);for(bw=0,bx=e.length;bw<bx;bw++){bv[e[bw]]=true;}return bv;}b.Callbacks=function(bx){bx=bx?(a3[bx]||X(bx)):{};var bC=[],bD=[],by,e,bz,bw,bA,bB,bF=function(bG){var bH,bK,bJ,bI,bL;for(bH=0,bK=bG.length;bH<bK;bH++){bJ=bG[bH];bI=b.type(bJ);if(bI==="array"){bF(bJ);}else{if(bI==="function"){if(!bx.unique||!bE.has(bJ)){bC.push(bJ);}}}}},bv=function(bH,bG){bG=bG||[];by=!bx.memory||[bH,bG];e=true;bz=true;bB=bw||0;bw=0;bA=bC.length;for(;bC&&bB<bA;bB++){if(bC[bB].apply(bH,bG)===false&&bx.stopOnFalse){by=true;break;}}bz=false;if(bC){if(!bx.once){if(bD&&bD.length){by=bD.shift();bE.fireWith(by[0],by[1]);}}else{if(by===true){bE.disable();}else{bC=[];}}}},bE={add:function(){if(bC){var bG=bC.length;bF(arguments);if(bz){bA=bC.length;}else{if(by&&by!==true){bw=bG;bv(by[0],by[1]);}}}return this;},remove:function(){if(bC){var bG=arguments,bI=0,bJ=bG.length;for(;bI<bJ;bI++){for(var bH=0;bH<bC.length;bH++){if(bG[bI]===bC[bH]){if(bz){if(bH<=bA){bA--;if(bH<=bB){bB--;}}}bC.splice(bH--,1);if(bx.unique){break;}}}}}return this;},has:function(bH){if(bC){var bG=0,bI=bC.length;for(;bG<bI;bG++){if(bH===bC[bG]){return true;}}}return false;},empty:function(){bC=[];return this;},disable:function(){bC=bD=by=L;return this;},disabled:function(){return !bC;},lock:function(){bD=L;if(!by||by===true){bE.disable();}return this;},locked:function(){return !bD;},fireWith:function(bH,bG){if(bD){if(bz){if(!bx.once){bD.push([bH,bG]);}}else{if(!(bx.once&&by)){bv(bH,bG);}}}return this;},fire:function(){bE.fireWith(this,arguments);return this;},fired:function(){return !!e;}};return bE;};var aK=[].slice;b.extend({Deferred:function(by){var bx=b.Callbacks("once memory"),bw=b.Callbacks("once memory"),bv=b.Callbacks("memory"),e="pending",bA={resolve:bx,reject:bw,notify:bv},bC={done:bx.add,fail:bw.add,progress:bv.add,state:function(){return e;},isResolved:bx.fired,isRejected:bw.fired,then:function(bE,bD,bF){bB.done(bE).fail(bD).progress(bF);return this;},always:function(){bB.done.apply(bB,arguments).fail.apply(bB,arguments);return this;},pipe:function(bF,bE,bD){return b.Deferred(function(bG){b.each({done:[bF,"resolve"],fail:[bE,"reject"],progress:[bD,"notify"]},function(bI,bL){var bH=bL[0],bK=bL[1],bJ;if(b.isFunction(bH)){bB[bI](function(){bJ=bH.apply(this,arguments);if(bJ&&b.isFunction(bJ.promise)){bJ.promise().then(bG.resolve,bG.reject,bG.notify);}else{bG[bK+"With"](this===bB?bG:this,[bJ]);}});}else{bB[bI](bG[bK]);}});}).promise();},promise:function(bE){if(bE==null){bE=bC;}else{for(var bD in bC){bE[bD]=bC[bD];}}return bE;}},bB=bC.promise({}),bz;for(bz in bA){bB[bz]=bA[bz].fire;bB[bz+"With"]=bA[bz].fireWith;}bB.done(function(){e="resolved";},bw.disable,bv.lock).fail(function(){e="rejected";},bx.disable,bv.lock);if(by){by.call(bB,bB);}return bB;},when:function(bA){var bx=aK.call(arguments,0),bv=0,e=bx.length,bB=new Array(e),bw=e,by=e,bC=e<=1&&bA&&b.isFunction(bA.promise)?bA:b.Deferred(),bE=bC.promise();function bD(bF){return function(bG){bx[bF]=arguments.length>1?aK.call(arguments,0):bG;if(!(--bw)){bC.resolveWith(bC,bx);}};}function bz(bF){return function(bG){bB[bF]=arguments.length>1?aK.call(arguments,0):bG;bC.notifyWith(bE,bB);};}if(e>1){for(;bv<e;bv++){if(bx[bv]&&bx[bv].promise&&b.isFunction(bx[bv].promise)){bx[bv].promise().then(bD(bv),bC.reject,bz(bv));}else{--bw;}}if(!bw){bC.resolveWith(bC,bx);}}else{if(bC!==bA){bC.resolveWith(bC,e?[bA]:[]);}}return bE;}});b.support=(function(){var bI,bH,bE,bF,bx,bD,bC,bz,bJ,bA,by,bw,bv=av.createElement("div"),bG=av.documentElement;bv.setAttribute("className","t");bv.innerHTML="   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>";bH=bv.getElementsByTagName("*");bE=bv.getElementsByTagName("a")[0];if(!bH||!bH.length||!bE){return{};}bF=av.createElement("select");bx=bF.appendChild(av.createElement("option"));bD=bv.getElementsByTagName("input")[0];bI={leadingWhitespace:(bv.firstChild.nodeType===3),tbody:!bv.getElementsByTagName("tbody").length,htmlSerialize:!!bv.getElementsByTagName("link").length,style:/top/.test(bE.getAttribute("style")),hrefNormalized:(bE.getAttribute("href")==="/a"),opacity:/^0.55/.test(bE.style.opacity),cssFloat:!!bE.style.cssFloat,checkOn:(bD.value==="on"),optSelected:bx.selected,getSetAttribute:bv.className!=="t",enctype:!!av.createElement("form").enctype,html5Clone:av.createElement("nav").cloneNode(true).outerHTML!=="<:nav></:nav>",submitBubbles:true,changeBubbles:true,focusinBubbles:false,deleteExpando:true,noCloneEvent:true,inlineBlockNeedsLayout:false,shrinkWrapBlocks:false,reliableMarginRight:true,pixelMargin:true};b.boxModel=bI.boxModel=(av.compatMode==="CSS1Compat");bD.checked=true;bI.noCloneChecked=bD.cloneNode(true).checked;bF.disabled=true;bI.optDisabled=!bx.disabled;try{delete bv.test;}catch(bB){bI.deleteExpando=false;}if(!bv.addEventListener&&bv.attachEvent&&bv.fireEvent){bv.attachEvent("onclick",function(){bI.noCloneEvent=false;});bv.cloneNode(true).fireEvent("onclick");}bD=av.createElement("input");bD.value="t";bD.setAttribute("type","radio");bI.radioValue=bD.value==="t";bD.setAttribute("checked","checked");bD.setAttribute("name","t");bv.appendChild(bD);bC=av.createDocumentFragment();bC.appendChild(bv.lastChild);bI.checkClone=bC.cloneNode(true).cloneNode(true).lastChild.checked;bI.appendChecked=bD.checked;bC.removeChild(bD);bC.appendChild(bv);if(bv.attachEvent){for(by in {submit:1,change:1,focusin:1}){bA="on"+by;bw=(bA in bv);if(!bw){bv.setAttribute(bA,"return;");bw=(typeof bv[bA]==="function");}bI[by+"Bubbles"]=bw;}}bC.removeChild(bv);bC=bF=bx=bv=bD=null;b(function(){var bM,bV,bW,bU,bO,bP,bR,bL,bK,bQ,bN,e,bT,bS=av.getElementsByTagName("body")[0];if(!bS){return;}bL=1;bT="padding:0;margin:0;border:";bN="position:absolute;top:0;left:0;width:1px;height:1px;";e=bT+"0;visibility:hidden;";bK="style='"+bN+bT+"5px solid #000;";bQ="<div "+bK+"display:block;'><div style='"+bT+"0;display:block;overflow:hidden;'></div></div><table "+bK+"' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";bM=av.createElement("div");bM.style.cssText=e+"width:0;height:0;position:static;top:0;margin-top:"+bL+"px";bS.insertBefore(bM,bS.firstChild);bv=av.createElement("div");bM.appendChild(bv);bv.innerHTML="<table><tr><td style='"+bT+"0;display:none'></td><td>t</td></tr></table>";bz=bv.getElementsByTagName("td");bw=(bz[0].offsetHeight===0);bz[0].style.display="";bz[1].style.display="none";bI.reliableHiddenOffsets=bw&&(bz[0].offsetHeight===0);if(bd.getComputedStyle){bv.innerHTML="";bR=av.createElement("div");bR.style.width="0";bR.style.marginRight="0";bv.style.width="2px";bv.appendChild(bR);bI.reliableMarginRight=(parseInt((bd.getComputedStyle(bR,null)||{marginRight:0}).marginRight,10)||0)===0;}if(typeof bv.style.zoom!=="undefined"){bv.innerHTML="";bv.style.width=bv.style.padding="1px";bv.style.border=0;bv.style.overflow="hidden";bv.style.display="inline";bv.style.zoom=1;bI.inlineBlockNeedsLayout=(bv.offsetWidth===3);bv.style.display="block";bv.style.overflow="visible";bv.innerHTML="<div style='width:5px;'></div>";bI.shrinkWrapBlocks=(bv.offsetWidth!==3);}bv.style.cssText=bN+e;bv.innerHTML=bQ;bV=bv.firstChild;bW=bV.firstChild;bO=bV.nextSibling.firstChild.firstChild;bP={doesNotAddBorder:(bW.offsetTop!==5),doesAddBorderForTableAndCells:(bO.offsetTop===5)};bW.style.position="fixed";bW.style.top="20px";bP.fixedPosition=(bW.offsetTop===20||bW.offsetTop===15);bW.style.position=bW.style.top="";bV.style.overflow="hidden";bV.style.position="relative";bP.subtractsBorderForOverflowNotVisible=(bW.offsetTop===-5);bP.doesNotIncludeMarginInBodyOffset=(bS.offsetTop!==bL);if(bd.getComputedStyle){bv.style.marginTop="1%";bI.pixelMargin=(bd.getComputedStyle(bv,null)||{marginTop:0}).marginTop!=="1%";}if(typeof bM.style.zoom!=="undefined"){bM.style.zoom=1;}bS.removeChild(bM);bR=bv=bM=null;b.extend(bI,bP);});return bI;})();var aT=/^(?:\{.*\}|\[.*\])$/,aA=/([A-Z])/g;b.extend({cache:{},uuid:0,expando:"jQuery"+(b.fn.jquery+Math.random()).replace(/\D/g,""),noData:{embed:true,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",applet:true},hasData:function(e){e=e.nodeType?b.cache[e[b.expando]]:e[b.expando];return !!e&&!S(e);},data:function(bx,bv,bz,by){if(!b.acceptData(bx)){return;}var bG,bA,bD,bE=b.expando,bC=typeof bv==="string",bF=bx.nodeType,e=bF?b.cache:bx,bw=bF?bx[bE]:bx[bE]&&bE,bB=bv==="events";if((!bw||!e[bw]||(!bB&&!by&&!e[bw].data))&&bC&&bz===L){return;}if(!bw){if(bF){bx[bE]=bw=++b.uuid;}else{bw=bE;}}if(!e[bw]){e[bw]={};if(!bF){e[bw].toJSON=b.noop;}}if(typeof bv==="object"||typeof bv==="function"){if(by){e[bw]=b.extend(e[bw],bv);}else{e[bw].data=b.extend(e[bw].data,bv);}}bG=bA=e[bw];if(!by){if(!bA.data){bA.data={};}bA=bA.data;}if(bz!==L){bA[b.camelCase(bv)]=bz;}if(bB&&!bA[bv]){return bG.events;}if(bC){bD=bA[bv];if(bD==null){bD=bA[b.camelCase(bv)];}}else{bD=bA;}return bD;},removeData:function(bx,bv,by){if(!b.acceptData(bx)){return;}var bB,bA,bz,bC=b.expando,bD=bx.nodeType,e=bD?b.cache:bx,bw=bD?bx[bC]:bC;if(!e[bw]){return;}if(bv){bB=by?e[bw]:e[bw].data;if(bB){if(!b.isArray(bv)){if(bv in bB){bv=[bv];}else{bv=b.camelCase(bv);if(bv in bB){bv=[bv];}else{bv=bv.split(" ");}}}for(bA=0,bz=bv.length;bA<bz;bA++){delete bB[bv[bA]];}if(!(by?S:b.isEmptyObject)(bB)){return;}}}if(!by){delete e[bw].data;if(!S(e[bw])){return;}}if(b.support.deleteExpando||!e.setInterval){delete e[bw];}else{e[bw]=null;}if(bD){if(b.support.deleteExpando){delete bx[bC];}else{if(bx.removeAttribute){bx.removeAttribute(bC);}else{bx[bC]=null;}}}},_data:function(bv,e,bw){return b.data(bv,e,bw,true);},acceptData:function(bv){if(bv.nodeName){var e=b.noData[bv.nodeName.toLowerCase()];if(e){return !(e===true||bv.getAttribute("classid")!==e);}}return true;}});b.fn.extend({data:function(bD,bC){var by,bv,bB,e,bx,bw=this[0],bA=0,bz=null;if(bD===L){if(this.length){bz=b.data(bw);if(bw.nodeType===1&&!b._data(bw,"parsedAttrs")){bB=bw.attributes;for(bx=bB.length;bA<bx;bA++){e=bB[bA].name;if(e.indexOf("data-")===0){e=b.camelCase(e.substring(5));a6(bw,e,bz[e]);}}b._data(bw,"parsedAttrs",true);}}return bz;}if(typeof bD==="object"){return this.each(function(){b.data(this,bD);});}by=bD.split(".",2);by[1]=by[1]?"."+by[1]:"";bv=by[1]+"!";return b.access(this,function(bE){if(bE===L){bz=this.triggerHandler("getData"+bv,[by[0]]);if(bz===L&&bw){bz=b.data(bw,bD);bz=a6(bw,bD,bz);}return bz===L&&by[1]?this.data(by[0]):bz;}by[1]=bE;this.each(function(){var bF=b(this);bF.triggerHandler("setData"+bv,by);b.data(this,bD,bE);bF.triggerHandler("changeData"+bv,by);});},null,bC,arguments.length>1,null,false);},removeData:function(e){return this.each(function(){b.removeData(this,e);});}});function a6(bx,bw,by){if(by===L&&bx.nodeType===1){var bv="data-"+bw.replace(aA,"-$1").toLowerCase();by=bx.getAttribute(bv);if(typeof by==="string"){try{by=by==="true"?true:by==="false"?false:by==="null"?null:b.isNumeric(by)?+by:aT.test(by)?b.parseJSON(by):by;}catch(bz){}b.data(bx,bw,by);}else{by=L;}}return by;}function S(bv){for(var e in bv){if(e==="data"&&b.isEmptyObject(bv[e])){continue;}if(e!=="toJSON"){return false;}}return true;}function bj(by,bx,bA){var bw=bx+"defer",bv=bx+"queue",e=bx+"mark",bz=b._data(by,bw);if(bz&&(bA==="queue"||!b._data(by,bv))&&(bA==="mark"||!b._data(by,e))){setTimeout(function(){if(!b._data(by,bv)&&!b._data(by,e)){b.removeData(by,bw,true);bz.fire();}},0);}}b.extend({_mark:function(bv,e){if(bv){e=(e||"fx")+"mark";b._data(bv,e,(b._data(bv,e)||0)+1);}},_unmark:function(by,bx,bv){if(by!==true){bv=bx;bx=by;by=false;}if(bx){bv=bv||"fx";var e=bv+"mark",bw=by?0:((b._data(bx,e)||1)-1);if(bw){b._data(bx,e,bw);}else{b.removeData(bx,e,true);bj(bx,bv,"mark");}}},queue:function(bv,e,bx){var bw;if(bv){e=(e||"fx")+"queue";bw=b._data(bv,e);if(bx){if(!bw||b.isArray(bx)){bw=b._data(bv,e,b.makeArray(bx));}else{bw.push(bx);}}return bw||[];}},dequeue:function(by,bx){bx=bx||"fx";var bv=b.queue(by,bx),bw=bv.shift(),e={};if(bw==="inprogress"){bw=bv.shift();}if(bw){if(bx==="fx"){bv.unshift("inprogress");}b._data(by,bx+".run",e);bw.call(by,function(){b.dequeue(by,bx);},e);}if(!bv.length){b.removeData(by,bx+"queue "+bx+".run",true);bj(by,bx,"queue");}}});b.fn.extend({queue:function(e,bv){var bw=2;if(typeof e!=="string"){bv=e;e="fx";bw--;}if(arguments.length<bw){return b.queue(this[0],e);}return bv===L?this:this.each(function(){var bx=b.queue(this,e,bv);if(e==="fx"&&bx[0]!=="inprogress"){b.dequeue(this,e);}});},dequeue:function(e){return this.each(function(){b.dequeue(this,e);});},delay:function(bv,e){bv=b.fx?b.fx.speeds[bv]||bv:bv;e=e||"fx";return this.queue(e,function(bx,bw){var by=setTimeout(bx,bv);bw.stop=function(){clearTimeout(by);};});},clearQueue:function(e){return this.queue(e||"fx",[]);},promise:function(bD,bw){if(typeof bD!=="string"){bw=bD;bD=L;}bD=bD||"fx";var e=b.Deferred(),bv=this,by=bv.length,bB=1,bz=bD+"defer",bA=bD+"queue",bC=bD+"mark",bx;function bE(){if(!(--bB)){e.resolveWith(bv,[bv]);}}while(by--){if((bx=b.data(bv[by],bz,L,true)||(b.data(bv[by],bA,L,true)||b.data(bv[by],bC,L,true))&&b.data(bv[by],bz,b.Callbacks("once memory"),true))){bB++;bx.add(bE);}}bE();return e.promise(bw);}});var aQ=/[\n\t\r]/g,ag=/\s+/,aV=/\r/g,g=/^(?:button|input)$/i,C=/^(?:button|input|object|select|textarea)$/i,l=/^a(?:rea)?$/i,ao=/^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,E=b.support.getSetAttribute,bf,aZ,aG;b.fn.extend({attr:function(e,bv){return b.access(this,b.attr,e,bv,arguments.length>1);},removeAttr:function(e){return this.each(function(){b.removeAttr(this,e);});},prop:function(e,bv){return b.access(this,b.prop,e,bv,arguments.length>1);},removeProp:function(e){e=b.propFix[e]||e;return this.each(function(){try{this[e]=L;delete this[e];}catch(bv){}});},addClass:function(by){var bA,bw,bv,bx,bz,bB,e;if(b.isFunction(by)){return this.each(function(bC){b(this).addClass(by.call(this,bC,this.className));});}if(by&&typeof by==="string"){bA=by.split(ag);for(bw=0,bv=this.length;bw<bv;bw++){bx=this[bw];if(bx.nodeType===1){if(!bx.className&&bA.length===1){bx.className=by;}else{bz=" "+bx.className+" ";for(bB=0,e=bA.length;bB<e;bB++){if(!~bz.indexOf(" "+bA[bB]+" ")){bz+=bA[bB]+" ";}}bx.className=b.trim(bz);}}}}return this;},removeClass:function(bz){var bA,bw,bv,by,bx,bB,e;if(b.isFunction(bz)){return this.each(function(bC){b(this).removeClass(bz.call(this,bC,this.className));});}if((bz&&typeof bz==="string")||bz===L){bA=(bz||"").split(ag);for(bw=0,bv=this.length;bw<bv;bw++){by=this[bw];if(by.nodeType===1&&by.className){if(bz){bx=(" "+by.className+" ").replace(aQ," ");for(bB=0,e=bA.length;bB<e;bB++){bx=bx.replace(" "+bA[bB]+" "," ");}by.className=b.trim(bx);}else{by.className="";}}}}return this;},toggleClass:function(bx,bv){var bw=typeof bx,e=typeof bv==="boolean";if(b.isFunction(bx)){return this.each(function(by){b(this).toggleClass(bx.call(this,by,this.className,bv),bv);});}return this.each(function(){if(bw==="string"){var bA,bz=0,by=b(this),bB=bv,bC=bx.split(ag);while((bA=bC[bz++])){bB=e?bB:!by.hasClass(bA);by[bB?"addClass":"removeClass"](bA);}}else{if(bw==="undefined"||bw==="boolean"){if(this.className){b._data(this,"__className__",this.className);}this.className=this.className||bx===false?"":b._data(this,"__className__")||"";}}});},hasClass:function(e){var bx=" "+e+" ",bw=0,bv=this.length;for(;bw<bv;bw++){if(this[bw].nodeType===1&&(" "+this[bw].className+" ").replace(aQ," ").indexOf(bx)>-1){return true;}}return false;},val:function(bx){var e,bv,by,bw=this[0];if(!arguments.length){if(bw){e=b.valHooks[bw.type]||b.valHooks[bw.nodeName.toLowerCase()];if(e&&"get" in e&&(bv=e.get(bw,"value"))!==L){return bv;}bv=bw.value;return typeof bv==="string"?bv.replace(aV,""):bv==null?"":bv;}return;}by=b.isFunction(bx);return this.each(function(bA){var bz=b(this),bB;if(this.nodeType!==1){return;}if(by){bB=bx.call(this,bA,bz.val());}else{bB=bx;}if(bB==null){bB="";}else{if(typeof bB==="number"){bB+="";}else{if(b.isArray(bB)){bB=b.map(bB,function(bC){return bC==null?"":bC+"";});}}}e=b.valHooks[this.type]||b.valHooks[this.nodeName.toLowerCase()];if(!e||!("set" in e)||e.set(this,bB,"value")===L){this.value=bB;}});}});b.extend({valHooks:{option:{get:function(e){var bv=e.attributes.value;return !bv||bv.specified?e.value:e.text;}},select:{get:function(e){var bA,bv,bz,bx,by=e.selectedIndex,bB=[],bC=e.options,bw=e.type==="select-one";if(by<0){return null;}bv=bw?by:0;bz=bw?by+1:bC.length;for(;bv<bz;bv++){bx=bC[bv];if(bx.selected&&(b.support.optDisabled?!bx.disabled:bx.getAttribute("disabled")===null)&&(!bx.parentNode.disabled||!b.nodeName(bx.parentNode,"optgroup"))){bA=b(bx).val();if(bw){return bA;}bB.push(bA);}}if(bw&&!bB.length&&bC.length){return b(bC[by]).val();}return bB;},set:function(bv,bw){var e=b.makeArray(bw);b(bv).find("option").each(function(){this.selected=b.inArray(b(this).val(),e)>=0;});if(!e.length){bv.selectedIndex=-1;}return e;}}},attrFn:{val:true,css:true,html:true,text:true,data:true,width:true,height:true,offset:true},attr:function(bA,bx,bB,bz){var bw,e,by,bv=bA.nodeType;if(!bA||bv===3||bv===8||bv===2){return;}if(bz&&bx in b.attrFn){return b(bA)[bx](bB);}if(typeof bA.getAttribute==="undefined"){return b.prop(bA,bx,bB);}by=bv!==1||!b.isXMLDoc(bA);if(by){bx=bx.toLowerCase();e=b.attrHooks[bx]||(ao.test(bx)?aZ:bf);}if(bB!==L){if(bB===null){b.removeAttr(bA,bx);return;}else{if(e&&"set" in e&&by&&(bw=e.set(bA,bB,bx))!==L){return bw;}else{bA.setAttribute(bx,""+bB);return bB;}}}else{if(e&&"get" in e&&by&&(bw=e.get(bA,bx))!==null){return bw;}else{bw=bA.getAttribute(bx);return bw===null?L:bw;}}},removeAttr:function(by,bA){var bz,bB,bw,e,bv,bx=0;if(bA&&by.nodeType===1){bB=bA.toLowerCase().split(ag);e=bB.length;for(;bx<e;bx++){bw=bB[bx];if(bw){bz=b.propFix[bw]||bw;bv=ao.test(bw);if(!bv){b.attr(by,bw,"");}by.removeAttribute(E?bw:bz);if(bv&&bz in by){by[bz]=false;}}}}},attrHooks:{type:{set:function(e,bv){if(g.test(e.nodeName)&&e.parentNode){b.error("type property can't be changed");}else{if(!b.support.radioValue&&bv==="radio"&&b.nodeName(e,"input")){var bw=e.value;e.setAttribute("type",bv);if(bw){e.value=bw;}return bv;}}}},value:{get:function(bv,e){if(bf&&b.nodeName(bv,"button")){return bf.get(bv,e);}return e in bv?bv.value:null;},set:function(bv,bw,e){if(bf&&b.nodeName(bv,"button")){return bf.set(bv,bw,e);}bv.value=bw;}}},propFix:{tabindex:"tabIndex",readonly:"readOnly","for":"htmlFor","class":"className",maxlength:"maxLength",cellspacing:"cellSpacing",cellpadding:"cellPadding",rowspan:"rowSpan",colspan:"colSpan",usemap:"useMap",frameborder:"frameBorder",contenteditable:"contentEditable"},prop:function(bz,bx,bA){var bw,e,by,bv=bz.nodeType;if(!bz||bv===3||bv===8||bv===2){return;}by=bv!==1||!b.isXMLDoc(bz);if(by){bx=b.propFix[bx]||bx;e=b.propHooks[bx];}if(bA!==L){if(e&&"set" in e&&(bw=e.set(bz,bA,bx))!==L){return bw;}else{return(bz[bx]=bA);}}else{if(e&&"get" in e&&(bw=e.get(bz,bx))!==null){return bw;}else{return bz[bx];}}},propHooks:{tabIndex:{get:function(bv){var e=bv.getAttributeNode("tabindex");return e&&e.specified?parseInt(e.value,10):C.test(bv.nodeName)||l.test(bv.nodeName)&&bv.href?0:L;}}}});b.attrHooks.tabindex=b.propHooks.tabIndex;aZ={get:function(bv,e){var bx,bw=b.prop(bv,e);return bw===true||typeof bw!=="boolean"&&(bx=bv.getAttributeNode(e))&&bx.nodeValue!==false?e.toLowerCase():L;},set:function(bv,bx,e){var bw;if(bx===false){b.removeAttr(bv,e);}else{bw=b.propFix[e]||e;if(bw in bv){bv[bw]=true;}bv.setAttribute(e,e.toLowerCase());}return e;}};if(!E){aG={name:true,id:true,coords:true};bf=b.valHooks.button={get:function(bw,bv){var e;e=bw.getAttributeNode(bv);return e&&(aG[bv]?e.nodeValue!=="":e.specified)?e.nodeValue:L;},set:function(bw,bx,bv){var e=bw.getAttributeNode(bv);if(!e){e=av.createAttribute(bv);bw.setAttributeNode(e);}return(e.nodeValue=bx+"");}};b.attrHooks.tabindex.set=bf.set;b.each(["width","height"],function(bv,e){b.attrHooks[e]=b.extend(b.attrHooks[e],{set:function(bw,bx){if(bx===""){bw.setAttribute(e,"auto");return bx;}}});});b.attrHooks.contenteditable={get:bf.get,set:function(bv,bw,e){if(bw===""){bw="false";}bf.set(bv,bw,e);}};}if(!b.support.hrefNormalized){b.each(["href","src","width","height"],function(bv,e){b.attrHooks[e]=b.extend(b.attrHooks[e],{get:function(bx){var bw=bx.getAttribute(e,2);return bw===null?L:bw;}});});}if(!b.support.style){b.attrHooks.style={get:function(e){return e.style.cssText.toLowerCase()||L;},set:function(e,bv){return(e.style.cssText=""+bv);}};}if(!b.support.optSelected){b.propHooks.selected=b.extend(b.propHooks.selected,{get:function(bv){var e=bv.parentNode;if(e){e.selectedIndex;if(e.parentNode){e.parentNode.selectedIndex;}}return null;}});}if(!b.support.enctype){b.propFix.enctype="encoding";}if(!b.support.checkOn){b.each(["radio","checkbox"],function(){b.valHooks[this]={get:function(e){return e.getAttribute("value")===null?"on":e.value;}};});}b.each(["radio","checkbox"],function(){b.valHooks[this]=b.extend(b.valHooks[this],{set:function(e,bv){if(b.isArray(bv)){return(e.checked=b.inArray(b(e).val(),bv)>=0);}}});});var be=/^(?:textarea|input|select)$/i,n=/^([^\.]*)?(?:\.(.+))?$/,J=/(?:^|\s)hover(\.\S+)?\b/,aP=/^key/,bg=/^(?:mouse|contextmenu)|click/,T=/^(?:focusinfocus|focusoutblur)$/,U=/^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/,Y=function(e){var bv=U.exec(e);if(bv){bv[1]=(bv[1]||"").toLowerCase();bv[3]=bv[3]&&new RegExp("(?:^|\\s)"+bv[3]+"(?:\\s|$)");}return bv;},j=function(bw,e){var bv=bw.attributes||{};return((!e[1]||bw.nodeName.toLowerCase()===e[1])&&(!e[2]||(bv.id||{}).value===e[2])&&(!e[3]||e[3].test((bv["class"]||{}).value)));},bt=function(e){return b.event.special.hover?e:e.replace(J,"mouseenter$1 mouseleave$1");};b.event={add:function(bx,bC,bJ,bA,by){var bD,bB,bK,bI,bH,bF,e,bG,bv,bz,bw,bE;if(bx.nodeType===3||bx.nodeType===8||!bC||!bJ||!(bD=b._data(bx))){return;}if(bJ.handler){bv=bJ;bJ=bv.handler;by=bv.selector;}if(!bJ.guid){bJ.guid=b.guid++;}bK=bD.events;if(!bK){bD.events=bK={};}bB=bD.handle;if(!bB){bD.handle=bB=function(bL){return typeof b!=="undefined"&&(!bL||b.event.triggered!==bL.type)?b.event.dispatch.apply(bB.elem,arguments):L;};bB.elem=bx;}bC=b.trim(bt(bC)).split(" ");for(bI=0;bI<bC.length;bI++){bH=n.exec(bC[bI])||[];bF=bH[1];e=(bH[2]||"").split(".").sort();bE=b.event.special[bF]||{};bF=(by?bE.delegateType:bE.bindType)||bF;bE=b.event.special[bF]||{};bG=b.extend({type:bF,origType:bH[1],data:bA,handler:bJ,guid:bJ.guid,selector:by,quick:by&&Y(by),namespace:e.join(".")},bv);bw=bK[bF];if(!bw){bw=bK[bF]=[];bw.delegateCount=0;if(!bE.setup||bE.setup.call(bx,bA,e,bB)===false){if(bx.addEventListener){bx.addEventListener(bF,bB,false);}else{if(bx.attachEvent){bx.attachEvent("on"+bF,bB);}}}}if(bE.add){bE.add.call(bx,bG);if(!bG.handler.guid){bG.handler.guid=bJ.guid;}}if(by){bw.splice(bw.delegateCount++,0,bG);}else{bw.push(bG);}b.event.global[bF]=true;}bx=null;},global:{},remove:function(bJ,bE,bv,bH,bB){var bI=b.hasData(bJ)&&b._data(bJ),bF,bx,bz,bL,bC,bA,bG,bw,by,bK,bD,e;if(!bI||!(bw=bI.events)){return;}bE=b.trim(bt(bE||"")).split(" ");for(bF=0;bF<bE.length;bF++){bx=n.exec(bE[bF])||[];bz=bL=bx[1];bC=bx[2];if(!bz){for(bz in bw){b.event.remove(bJ,bz+bE[bF],bv,bH,true);}continue;}by=b.event.special[bz]||{};bz=(bH?by.delegateType:by.bindType)||bz;bD=bw[bz]||[];bA=bD.length;bC=bC?new RegExp("(^|\\.)"+bC.split(".").sort().join("\\.(?:.*\\.)?")+"(\\.|$)"):null;for(bG=0;bG<bD.length;bG++){e=bD[bG];if((bB||bL===e.origType)&&(!bv||bv.guid===e.guid)&&(!bC||bC.test(e.namespace))&&(!bH||bH===e.selector||bH==="**"&&e.selector)){bD.splice(bG--,1);if(e.selector){bD.delegateCount--;}if(by.remove){by.remove.call(bJ,e);}}}if(bD.length===0&&bA!==bD.length){if(!by.teardown||by.teardown.call(bJ,bC)===false){b.removeEvent(bJ,bz,bI.handle);}delete bw[bz];}}if(b.isEmptyObject(bw)){bK=bI.handle;if(bK){bK.elem=null;}b.removeData(bJ,["events","handle"],true);}},customEvent:{getData:true,setData:true,changeData:true},trigger:function(bv,bD,bA,bJ){if(bA&&(bA.nodeType===3||bA.nodeType===8)){return;}var bG=bv.type||bv,bx=[],e,bw,bC,bH,bz,by,bF,bE,bB,bI;if(T.test(bG+b.event.triggered)){return;}if(bG.indexOf("!")>=0){bG=bG.slice(0,-1);bw=true;}if(bG.indexOf(".")>=0){bx=bG.split(".");bG=bx.shift();bx.sort();}if((!bA||b.event.customEvent[bG])&&!b.event.global[bG]){return;}bv=typeof bv==="object"?bv[b.expando]?bv:new b.Event(bG,bv):new b.Event(bG);bv.type=bG;bv.isTrigger=true;bv.exclusive=bw;bv.namespace=bx.join(".");bv.namespace_re=bv.namespace?new RegExp("(^|\\.)"+bx.join("\\.(?:.*\\.)?")+"(\\.|$)"):null;by=bG.indexOf(":")<0?"on"+bG:"";if(!bA){e=b.cache;for(bC in e){if(e[bC].events&&e[bC].events[bG]){b.event.trigger(bv,bD,e[bC].handle.elem,true);}}return;}bv.result=L;if(!bv.target){bv.target=bA;}bD=bD!=null?b.makeArray(bD):[];bD.unshift(bv);bF=b.event.special[bG]||{};if(bF.trigger&&bF.trigger.apply(bA,bD)===false){return;}bB=[[bA,bF.bindType||bG]];if(!bJ&&!bF.noBubble&&!b.isWindow(bA)){bI=bF.delegateType||bG;bH=T.test(bI+bG)?bA:bA.parentNode;bz=null;for(;bH;bH=bH.parentNode){bB.push([bH,bI]);bz=bH;}if(bz&&bz===bA.ownerDocument){bB.push([bz.defaultView||bz.parentWindow||bd,bI]);}}for(bC=0;bC<bB.length&&!bv.isPropagationStopped();bC++){bH=bB[bC][0];bv.type=bB[bC][1];bE=(b._data(bH,"events")||{})[bv.type]&&b._data(bH,"handle");if(bE){bE.apply(bH,bD);}bE=by&&bH[by];if(bE&&b.acceptData(bH)&&bE.apply(bH,bD)===false){bv.preventDefault();}}bv.type=bG;if(!bJ&&!bv.isDefaultPrevented()){if((!bF._default||bF._default.apply(bA.ownerDocument,bD)===false)&&!(bG==="click"&&b.nodeName(bA,"a"))&&b.acceptData(bA)){if(by&&bA[bG]&&((bG!=="focus"&&bG!=="blur")||bv.target.offsetWidth!==0)&&!b.isWindow(bA)){bz=bA[by];if(bz){bA[by]=null;}b.event.triggered=bG;bA[bG]();b.event.triggered=L;if(bz){bA[by]=bz;}}}}return bv.result;},dispatch:function(bH){bH=b.event.fix(bH||bd.event);var bD=((b._data(this,"events")||{})[bH.type]||[]),bC=bD.delegateCount,bx=[].slice.call(arguments,0),bE=!bH.exclusive&&!bH.namespace,bz=b.event.special[bH.type]||{},bv=[],bJ,bG,by,bA,bK,bI,bB,bw,e,bF,bL;bx[0]=bH;bH.delegateTarget=this;if(bz.preDispatch&&bz.preDispatch.call(this,bH)===false){return;}if(bC&&!(bH.button&&bH.type==="click")){bA=b(this);bA.context=this.ownerDocument||this;for(by=bH.target;by!=this;by=by.parentNode||this){if(by.disabled!==true){bI={};bw=[];bA[0]=by;for(bJ=0;bJ<bC;bJ++){e=bD[bJ];bF=e.selector;if(bI[bF]===L){bI[bF]=(e.quick?j(by,e.quick):bA.is(bF));}if(bI[bF]){bw.push(e);}}if(bw.length){bv.push({elem:by,matches:bw});}}}}if(bD.length>bC){bv.push({elem:this,matches:bD.slice(bC)});}for(bJ=0;bJ<bv.length&&!bH.isPropagationStopped();bJ++){bB=bv[bJ];bH.currentTarget=bB.elem;for(bG=0;bG<bB.matches.length&&!bH.isImmediatePropagationStopped();bG++){e=bB.matches[bG];if(bE||(!bH.namespace&&!e.namespace)||bH.namespace_re&&bH.namespace_re.test(e.namespace)){bH.data=e.data;bH.handleObj=e;bK=((b.event.special[e.origType]||{}).handle||e.handler).apply(bB.elem,bx);if(bK!==L){bH.result=bK;if(bK===false){bH.preventDefault();bH.stopPropagation();}}}}}if(bz.postDispatch){bz.postDispatch.call(this,bH);}return bH.result;},props:"attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(bv,e){if(bv.which==null){bv.which=e.charCode!=null?e.charCode:e.keyCode;}return bv;}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(bx,bw){var by,bz,e,bv=bw.button,bA=bw.fromElement;if(bx.pageX==null&&bw.clientX!=null){by=bx.target.ownerDocument||av;bz=by.documentElement;e=by.body;bx.pageX=bw.clientX+(bz&&bz.scrollLeft||e&&e.scrollLeft||0)-(bz&&bz.clientLeft||e&&e.clientLeft||0);bx.pageY=bw.clientY+(bz&&bz.scrollTop||e&&e.scrollTop||0)-(bz&&bz.clientTop||e&&e.clientTop||0);}if(!bx.relatedTarget&&bA){bx.relatedTarget=bA===bx.target?bw.toElement:bA;}if(!bx.which&&bv!==L){bx.which=(bv&1?1:(bv&2?3:(bv&4?2:0)));}return bx;}},fix:function(bw){if(bw[b.expando]){return bw;}var bv,bz,e=bw,bx=b.event.fixHooks[bw.type]||{},by=bx.props?this.props.concat(bx.props):this.props;bw=b.Event(e);for(bv=by.length;bv;){bz=by[--bv];bw[bz]=e[bz];}if(!bw.target){bw.target=e.srcElement||av;}if(bw.target.nodeType===3){bw.target=bw.target.parentNode;}if(bw.metaKey===L){bw.metaKey=bw.ctrlKey;}return bx.filter?bx.filter(bw,e):bw;},special:{ready:{setup:b.bindReady},load:{noBubble:true},focus:{delegateType:"focusin"},blur:{delegateType:"focusout"},beforeunload:{setup:function(bw,bv,e){if(b.isWindow(this)){this.onbeforeunload=e;}},teardown:function(bv,e){if(this.onbeforeunload===e){this.onbeforeunload=null;}}}},simulate:function(bw,by,bx,bv){var bz=b.extend(new b.Event(),bx,{type:bw,isSimulated:true,originalEvent:{}});if(bv){b.event.trigger(bz,null,by);}else{b.event.dispatch.call(by,bz);}if(bz.isDefaultPrevented()){bx.preventDefault();}}};b.event.handle=b.event.dispatch;b.removeEvent=av.removeEventListener?function(bv,e,bw){if(bv.removeEventListener){bv.removeEventListener(e,bw,false);}}:function(bv,e,bw){if(bv.detachEvent){bv.detachEvent("on"+e,bw);}};b.Event=function(bv,e){if(!(this instanceof b.Event)){return new b.Event(bv,e);}if(bv&&bv.type){this.originalEvent=bv;this.type=bv.type;this.isDefaultPrevented=(bv.defaultPrevented||bv.returnValue===false||bv.getPreventDefault&&bv.getPreventDefault())?i:bl;}else{this.type=bv;}if(e){b.extend(this,e);}this.timeStamp=bv&&bv.timeStamp||b.now();this[b.expando]=true;};function bl(){return false;}function i(){return true;}b.Event.prototype={preventDefault:function(){this.isDefaultPrevented=i;var bv=this.originalEvent;if(!bv){return;}if(bv.preventDefault){bv.preventDefault();}else{bv.returnValue=false;}},stopPropagation:function(){this.isPropagationStopped=i;var bv=this.originalEvent;if(!bv){return;}if(bv.stopPropagation){bv.stopPropagation();}bv.cancelBubble=true;},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=i;this.stopPropagation();},isDefaultPrevented:bl,isPropagationStopped:bl,isImmediatePropagationStopped:bl};b.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(bv,e){b.event.special[bv]={delegateType:e,bindType:e,handle:function(bz){var bB=this,bA=bz.relatedTarget,by=bz.handleObj,bw=by.selector,bx;if(!bA||(bA!==bB&&!b.contains(bB,bA))){bz.type=by.origType;bx=by.handler.apply(this,arguments);bz.type=e;}return bx;}};});if(!b.support.submitBubbles){b.event.special.submit={setup:function(){if(b.nodeName(this,"form")){return false;}b.event.add(this,"click._submit keypress._submit",function(bx){var bw=bx.target,bv=b.nodeName(bw,"input")||b.nodeName(bw,"button")?bw.form:L;if(bv&&!bv._submit_attached){b.event.add(bv,"submit._submit",function(e){e._submit_bubble=true;});bv._submit_attached=true;}});},postDispatch:function(e){if(e._submit_bubble){delete e._submit_bubble;if(this.parentNode&&!e.isTrigger){b.event.simulate("submit",this.parentNode,e,true);}}},teardown:function(){if(b.nodeName(this,"form")){return false;}b.event.remove(this,"._submit");}};}if(!b.support.changeBubbles){b.event.special.change={setup:function(){if(be.test(this.nodeName)){if(this.type==="checkbox"||this.type==="radio"){b.event.add(this,"propertychange._change",function(e){if(e.originalEvent.propertyName==="checked"){this._just_changed=true;}});b.event.add(this,"click._change",function(e){if(this._just_changed&&!e.isTrigger){this._just_changed=false;b.event.simulate("change",this,e,true);}});}return false;}b.event.add(this,"beforeactivate._change",function(bw){var bv=bw.target;if(be.test(bv.nodeName)&&!bv._change_attached){b.event.add(bv,"change._change",function(e){if(this.parentNode&&!e.isSimulated&&!e.isTrigger){b.event.simulate("change",this.parentNode,e,true);}});bv._change_attached=true;}});},handle:function(bv){var e=bv.target;if(this!==e||bv.isSimulated||bv.isTrigger||(e.type!=="radio"&&e.type!=="checkbox")){return bv.handleObj.handler.apply(this,arguments);}},teardown:function(){b.event.remove(this,"._change");return be.test(this.nodeName);}};}if(!b.support.focusinBubbles){b.each({focus:"focusin",blur:"focusout"},function(bx,e){var bv=0,bw=function(by){b.event.simulate(e,by.target,b.event.fix(by),true);};b.event.special[e]={setup:function(){if(bv++===0){av.addEventListener(bx,bw,true);}},teardown:function(){if(--bv===0){av.removeEventListener(bx,bw,true);}}};});}b.fn.extend({on:function(bw,e,bz,by,bv){var bA,bx;if(typeof bw==="object"){if(typeof e!=="string"){bz=bz||e;e=L;}for(bx in bw){this.on(bx,e,bz,bw[bx],bv);}return this;}if(bz==null&&by==null){by=e;bz=e=L;}else{if(by==null){if(typeof e==="string"){by=bz;bz=L;}else{by=bz;bz=e;e=L;}}}if(by===false){by=bl;}else{if(!by){return this;}}if(bv===1){bA=by;by=function(bB){b().off(bB);return bA.apply(this,arguments);};by.guid=bA.guid||(bA.guid=b.guid++);}return this.each(function(){b.event.add(this,bw,by,bz,e);});},one:function(bv,e,bx,bw){return this.on(bv,e,bx,bw,1);},off:function(bw,e,by){if(bw&&bw.preventDefault&&bw.handleObj){var bv=bw.handleObj;b(bw.delegateTarget).off(bv.namespace?bv.origType+"."+bv.namespace:bv.origType,bv.selector,bv.handler);return this;}if(typeof bw==="object"){for(var bx in bw){this.off(bx,e,bw[bx]);}return this;}if(e===false||typeof e==="function"){by=e;e=L;}if(by===false){by=bl;}return this.each(function(){b.event.remove(this,bw,by,e);});},bind:function(e,bw,bv){return this.on(e,null,bw,bv);},unbind:function(e,bv){return this.off(e,null,bv);},live:function(e,bw,bv){b(this.context).on(e,this.selector,bw,bv);return this;},die:function(e,bv){b(this.context).off(e,this.selector||"**",bv);return this;},delegate:function(e,bv,bx,bw){return this.on(bv,e,bx,bw);},undelegate:function(e,bv,bw){return arguments.length==1?this.off(e,"**"):this.off(bv,e,bw);},trigger:function(e,bv){return this.each(function(){b.event.trigger(e,bv,this);});},triggerHandler:function(e,bv){if(this[0]){return b.event.trigger(e,bv,this[0],true);}},toggle:function(bx){var bv=arguments,e=bx.guid||b.guid++,bw=0,by=function(bz){var bA=(b._data(this,"lastToggle"+bx.guid)||0)%bw;b._data(this,"lastToggle"+bx.guid,bA+1);bz.preventDefault();return bv[bA].apply(this,arguments)||false;};by.guid=e;while(bw<bv.length){bv[bw++].guid=e;}return this.click(by);},hover:function(e,bv){return this.mouseenter(e).mouseleave(bv||e);}});b.each(("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu").split(" "),function(bv,e){b.fn[e]=function(bx,bw){if(bw==null){bw=bx;bx=null;}return arguments.length>0?this.on(e,null,bx,bw):this.trigger(e);};if(b.attrFn){b.attrFn[e]=true;}if(aP.test(e)){b.event.fixHooks[e]=b.event.keyHooks;}if(bg.test(e)){b.event.fixHooks[e]=b.event.mouseHooks;}});
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
;(function(){var bH=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,bC="sizcache"+(Math.random()+"").replace(".",""),bI=0,bL=Object.prototype.toString,bB=false,bA=true,bK=/\\/g,bO=/\r\n/g,bQ=/\W/;[0,0].sort(function(){bA=false;return 0;});var by=function(bV,e,bY,bZ){bY=bY||[];e=e||av;var b1=e;if(e.nodeType!==1&&e.nodeType!==9){return[];}if(!bV||typeof bV!=="string"){return bY;}var bS,b3,b6,bR,b2,b5,b4,bX,bU=true,bT=by.isXML(e),bW=[],b0=bV;do{bH.exec("");bS=bH.exec(b0);if(bS){b0=bS[3];bW.push(bS[1]);if(bS[2]){bR=bS[3];break;}}}while(bS);if(bW.length>1&&bD.exec(bV)){if(bW.length===2&&bE.relative[bW[0]]){b3=bM(bW[0]+bW[1],e,bZ);}else{b3=bE.relative[bW[0]]?[e]:by(bW.shift(),e);while(bW.length){bV=bW.shift();if(bE.relative[bV]){bV+=bW.shift();}b3=bM(bV,b3,bZ);}}}else{if(!bZ&&bW.length>1&&e.nodeType===9&&!bT&&bE.match.ID.test(bW[0])&&!bE.match.ID.test(bW[bW.length-1])){b2=by.find(bW.shift(),e,bT);e=b2.expr?by.filter(b2.expr,b2.set)[0]:b2.set[0];}if(e){b2=bZ?{expr:bW.pop(),set:bF(bZ)}:by.find(bW.pop(),bW.length===1&&(bW[0]==="~"||bW[0]==="+")&&e.parentNode?e.parentNode:e,bT);b3=b2.expr?by.filter(b2.expr,b2.set):b2.set;if(bW.length>0){b6=bF(b3);}else{bU=false;}while(bW.length){b5=bW.pop();b4=b5;if(!bE.relative[b5]){b5="";}else{b4=bW.pop();}if(b4==null){b4=e;}bE.relative[b5](b6,b4,bT);}}else{b6=bW=[];}}if(!b6){b6=b3;}if(!b6){by.error(b5||bV);}if(bL.call(b6)==="[object Array]"){if(!bU){bY.push.apply(bY,b6);}else{if(e&&e.nodeType===1){for(bX=0;b6[bX]!=null;bX++){if(b6[bX]&&(b6[bX]===true||b6[bX].nodeType===1&&by.contains(e,b6[bX]))){bY.push(b3[bX]);}}}else{for(bX=0;b6[bX]!=null;bX++){if(b6[bX]&&b6[bX].nodeType===1){bY.push(b3[bX]);}}}}}else{bF(b6,bY);}if(bR){by(bR,b1,bY,bZ);by.uniqueSort(bY);}return bY;};by.uniqueSort=function(bR){if(bJ){bB=bA;bR.sort(bJ);if(bB){for(var e=1;e<bR.length;e++){if(bR[e]===bR[e-1]){bR.splice(e--,1);}}}}return bR;};by.matches=function(e,bR){return by(e,null,null,bR);};by.matchesSelector=function(e,bR){return by(bR,null,null,[e]).length>0;};by.find=function(bX,e,bY){var bW,bS,bU,bT,bV,bR;if(!bX){return[];}for(bS=0,bU=bE.order.length;bS<bU;bS++){bV=bE.order[bS];if((bT=bE.leftMatch[bV].exec(bX))){bR=bT[1];bT.splice(1,1);if(bR.substr(bR.length-1)!=="\\"){bT[1]=(bT[1]||"").replace(bK,"");bW=bE.find[bV](bT,e,bY);if(bW!=null){bX=bX.replace(bE.match[bV],"");break;}}}}if(!bW){bW=typeof e.getElementsByTagName!=="undefined"?e.getElementsByTagName("*"):[];}return{set:bW,expr:bX};};by.filter=function(b1,b0,b4,bU){var bW,e,bZ,b6,b3,bR,bT,bV,b2,bS=b1,b5=[],bY=b0,bX=b0&&b0[0]&&by.isXML(b0[0]);while(b1&&b0.length){for(bZ in bE.filter){if((bW=bE.leftMatch[bZ].exec(b1))!=null&&bW[2]){bR=bE.filter[bZ];bT=bW[1];e=false;bW.splice(1,1);if(bT.substr(bT.length-1)==="\\"){continue;}if(bY===b5){b5=[];}if(bE.preFilter[bZ]){bW=bE.preFilter[bZ](bW,bY,b4,b5,bU,bX);if(!bW){e=b6=true;}else{if(bW===true){continue;}}}if(bW){for(bV=0;(b3=bY[bV])!=null;bV++){if(b3){b6=bR(b3,bW,bV,bY);b2=bU^b6;if(b4&&b6!=null){if(b2){e=true;}else{bY[bV]=false;}}else{if(b2){b5.push(b3);e=true;}}}}}if(b6!==L){if(!b4){bY=b5;}b1=b1.replace(bE.match[bZ],"");if(!e){return[];}break;}}}if(b1===bS){if(e==null){by.error(b1);}else{break;}}bS=b1;}return bY;};by.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e);};var bw=by.getText=function(bU){var bS,bT,e=bU.nodeType,bR="";if(e){if(e===1||e===9||e===11){if(typeof bU.textContent==="string"){return bU.textContent;}else{if(typeof bU.innerText==="string"){return bU.innerText.replace(bO,"");}else{for(bU=bU.firstChild;bU;bU=bU.nextSibling){bR+=bw(bU);}}}}else{if(e===3||e===4){return bU.nodeValue;}}}else{for(bS=0;(bT=bU[bS]);bS++){if(bT.nodeType!==8){bR+=bw(bT);}}}return bR;};var bE=by.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/},leftMatch:{},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(e){return e.getAttribute("href");},type:function(e){return e.getAttribute("type");}},relative:{"+":function(bW,bR){var bT=typeof bR==="string",bV=bT&&!bQ.test(bR),bX=bT&&!bV;if(bV){bR=bR.toLowerCase();}for(var bS=0,e=bW.length,bU;bS<e;bS++){if((bU=bW[bS])){while((bU=bU.previousSibling)&&bU.nodeType!==1){}bW[bS]=bX||bU&&bU.nodeName.toLowerCase()===bR?bU||false:bU===bR;}}if(bX){by.filter(bR,bW,true);}},">":function(bW,bR){var bV,bU=typeof bR==="string",bS=0,e=bW.length;if(bU&&!bQ.test(bR)){bR=bR.toLowerCase();for(;bS<e;bS++){bV=bW[bS];if(bV){var bT=bV.parentNode;bW[bS]=bT.nodeName.toLowerCase()===bR?bT:false;}}}else{for(;bS<e;bS++){bV=bW[bS];if(bV){bW[bS]=bU?bV.parentNode:bV.parentNode===bR;}}if(bU){by.filter(bR,bW,true);}}},"":function(bT,bR,bV){var bU,bS=bI++,e=bN;if(typeof bR==="string"&&!bQ.test(bR)){bR=bR.toLowerCase();bU=bR;e=bv;}e("parentNode",bR,bS,bT,bU,bV);},"~":function(bT,bR,bV){var bU,bS=bI++,e=bN;if(typeof bR==="string"&&!bQ.test(bR)){bR=bR.toLowerCase();bU=bR;e=bv;}e("previousSibling",bR,bS,bT,bU,bV);}},find:{ID:function(bR,bS,bT){if(typeof bS.getElementById!=="undefined"&&!bT){var e=bS.getElementById(bR[1]);return e&&e.parentNode?[e]:[];}},NAME:function(bS,bV){if(typeof bV.getElementsByName!=="undefined"){var bR=[],bU=bV.getElementsByName(bS[1]);for(var bT=0,e=bU.length;bT<e;bT++){if(bU[bT].getAttribute("name")===bS[1]){bR.push(bU[bT]);}}return bR.length===0?null:bR;}},TAG:function(e,bR){if(typeof bR.getElementsByTagName!=="undefined"){return bR.getElementsByTagName(e[1]);}}},preFilter:{CLASS:function(bT,bR,bS,e,bW,bX){bT=" "+bT[1].replace(bK,"")+" ";if(bX){return bT;}for(var bU=0,bV;(bV=bR[bU])!=null;bU++){if(bV){if(bW^(bV.className&&(" "+bV.className+" ").replace(/[\t\n\r]/g," ").indexOf(bT)>=0)){if(!bS){e.push(bV);}}else{if(bS){bR[bU]=false;}}}}return false;},ID:function(e){return e[1].replace(bK,"");},TAG:function(bR,e){return bR[1].replace(bK,"").toLowerCase();},CHILD:function(e){if(e[1]==="nth"){if(!e[2]){by.error(e[0]);}e[2]=e[2].replace(/^\+|\s*/g,"");var bR=/(-?)(\d*)(?:n([+\-]?\d*))?/.exec(e[2]==="even"&&"2n"||e[2]==="odd"&&"2n+1"||!/\D/.test(e[2])&&"0n+"+e[2]||e[2]);e[2]=(bR[1]+(bR[2]||1))-0;e[3]=bR[3]-0;}else{if(e[2]){by.error(e[0]);}}e[0]=bI++;return e;},ATTR:function(bU,bR,bS,e,bV,bW){var bT=bU[1]=bU[1].replace(bK,"");if(!bW&&bE.attrMap[bT]){bU[1]=bE.attrMap[bT];}bU[4]=(bU[4]||bU[5]||"").replace(bK,"");if(bU[2]==="~="){bU[4]=" "+bU[4]+" ";}return bU;},PSEUDO:function(bU,bR,bS,e,bV){if(bU[1]==="not"){if((bH.exec(bU[3])||"").length>1||/^\w/.test(bU[3])){bU[3]=by(bU[3],null,null,bR);}else{var bT=by.filter(bU[3],bR,bS,true^bV);if(!bS){e.push.apply(e,bT);}return false;}}else{if(bE.match.POS.test(bU[0])||bE.match.CHILD.test(bU[0])){return true;}}return bU;},POS:function(e){e.unshift(true);return e;}},filters:{enabled:function(e){return e.disabled===false&&e.type!=="hidden";},disabled:function(e){return e.disabled===true;},checked:function(e){return e.checked===true;},selected:function(e){if(e.parentNode){e.parentNode.selectedIndex;}return e.selected===true;},parent:function(e){return !!e.firstChild;},empty:function(e){return !e.firstChild;},has:function(bS,bR,e){return !!by(e[3],bS).length;},header:function(e){return(/h\d/i).test(e.nodeName);},text:function(bS){var e=bS.getAttribute("type"),bR=bS.type;return bS.nodeName.toLowerCase()==="input"&&"text"===bR&&(e===bR||e===null);},radio:function(e){return e.nodeName.toLowerCase()==="input"&&"radio"===e.type;},checkbox:function(e){return e.nodeName.toLowerCase()==="input"&&"checkbox"===e.type;},file:function(e){return e.nodeName.toLowerCase()==="input"&&"file"===e.type;},password:function(e){return e.nodeName.toLowerCase()==="input"&&"password"===e.type;},submit:function(bR){var e=bR.nodeName.toLowerCase();return(e==="input"||e==="button")&&"submit"===bR.type;},image:function(e){return e.nodeName.toLowerCase()==="input"&&"image"===e.type;},reset:function(bR){var e=bR.nodeName.toLowerCase();return(e==="input"||e==="button")&&"reset"===bR.type;},button:function(bR){var e=bR.nodeName.toLowerCase();return e==="input"&&"button"===bR.type||e==="button";},input:function(e){return(/input|select|textarea|button/i).test(e.nodeName);},focus:function(e){return e===e.ownerDocument.activeElement;}},setFilters:{first:function(bR,e){return e===0;},last:function(bS,bR,e,bT){return bR===bT.length-1;},even:function(bR,e){return e%2===0;},odd:function(bR,e){return e%2===1;},lt:function(bS,bR,e){return bR<e[3]-0;},gt:function(bS,bR,e){return bR>e[3]-0;},nth:function(bS,bR,e){return e[3]-0===bR;},eq:function(bS,bR,e){return e[3]-0===bR;}},filter:{PSEUDO:function(bS,bX,bW,bY){var e=bX[1],bR=bE.filters[e];if(bR){return bR(bS,bW,bX,bY);}else{if(e==="contains"){return(bS.textContent||bS.innerText||bw([bS])||"").indexOf(bX[3])>=0;}else{if(e==="not"){var bT=bX[3];for(var bV=0,bU=bT.length;bV<bU;bV++){if(bT[bV]===bS){return false;}}return true;}else{by.error(e);}}}},CHILD:function(bS,bU){var bT,b0,bW,bZ,e,bV,bY,bX=bU[1],bR=bS;switch(bX){case"only":case"first":while((bR=bR.previousSibling)){if(bR.nodeType===1){return false;}}if(bX==="first"){return true;}bR=bS;case"last":while((bR=bR.nextSibling)){if(bR.nodeType===1){return false;}}return true;case"nth":bT=bU[2];b0=bU[3];if(bT===1&&b0===0){return true;}bW=bU[0];bZ=bS.parentNode;if(bZ&&(bZ[bC]!==bW||!bS.nodeIndex)){bV=0;for(bR=bZ.firstChild;bR;bR=bR.nextSibling){if(bR.nodeType===1){bR.nodeIndex=++bV;}}bZ[bC]=bW;}bY=bS.nodeIndex-b0;if(bT===0){return bY===0;}else{return(bY%bT===0&&bY/bT>=0);}}},ID:function(bR,e){return bR.nodeType===1&&bR.getAttribute("id")===e;},TAG:function(bR,e){return(e==="*"&&bR.nodeType===1)||!!bR.nodeName&&bR.nodeName.toLowerCase()===e;},CLASS:function(bR,e){return(" "+(bR.className||bR.getAttribute("class"))+" ").indexOf(e)>-1;},ATTR:function(bV,bT){var bS=bT[1],e=by.attr?by.attr(bV,bS):bE.attrHandle[bS]?bE.attrHandle[bS](bV):bV[bS]!=null?bV[bS]:bV.getAttribute(bS),bW=e+"",bU=bT[2],bR=bT[4];return e==null?bU==="!=":!bU&&by.attr?e!=null:bU==="="?bW===bR:bU==="*="?bW.indexOf(bR)>=0:bU==="~="?(" "+bW+" ").indexOf(bR)>=0:!bR?bW&&e!==false:bU==="!="?bW!==bR:bU==="^="?bW.indexOf(bR)===0:bU==="$="?bW.substr(bW.length-bR.length)===bR:bU==="|="?bW===bR||bW.substr(0,bR.length+1)===bR+"-":false;},POS:function(bU,bR,bS,bV){var e=bR[2],bT=bE.setFilters[e];if(bT){return bT(bU,bS,bR,bV);}}}};var bD=bE.match.POS,bx=function(bR,e){return"\\"+(e-0+1);};for(var bz in bE.match){bE.match[bz]=new RegExp(bE.match[bz].source+(/(?![^\[]*\])(?![^\(]*\))/.source));bE.leftMatch[bz]=new RegExp(/(^(?:.|\r|\n)*?)/.source+bE.match[bz].source.replace(/\\(\d+)/g,bx));}bE.match.globalPOS=bD;var bF=function(bR,e){bR=Array.prototype.slice.call(bR,0);if(e){e.push.apply(e,bR);return e;}return bR;};try{Array.prototype.slice.call(av.documentElement.childNodes,0)[0].nodeType;}catch(bP){bF=function(bU,bT){var bS=0,bR=bT||[];if(bL.call(bU)==="[object Array]"){Array.prototype.push.apply(bR,bU);}else{if(typeof bU.length==="number"){for(var e=bU.length;bS<e;bS++){bR.push(bU[bS]);}}else{for(;bU[bS];bS++){bR.push(bU[bS]);}}}return bR;};}var bJ,bG;if(av.documentElement.compareDocumentPosition){bJ=function(bR,e){if(bR===e){bB=true;return 0;}if(!bR.compareDocumentPosition||!e.compareDocumentPosition){return bR.compareDocumentPosition?-1:1;}return bR.compareDocumentPosition(e)&4?-1:1;};}else{bJ=function(bY,bX){if(bY===bX){bB=true;return 0;}else{if(bY.sourceIndex&&bX.sourceIndex){return bY.sourceIndex-bX.sourceIndex;}}var bV,bR,bS=[],e=[],bU=bY.parentNode,bW=bX.parentNode,bZ=bU;if(bU===bW){return bG(bY,bX);}else{if(!bU){return -1;}else{if(!bW){return 1;}}}while(bZ){bS.unshift(bZ);bZ=bZ.parentNode;}bZ=bW;while(bZ){e.unshift(bZ);bZ=bZ.parentNode;}bV=bS.length;bR=e.length;for(var bT=0;bT<bV&&bT<bR;bT++){if(bS[bT]!==e[bT]){return bG(bS[bT],e[bT]);}}return bT===bV?bG(bY,e[bT],-1):bG(bS[bT],bX,1);};bG=function(bR,e,bS){if(bR===e){return bS;}var bT=bR.nextSibling;while(bT){if(bT===e){return -1;}bT=bT.nextSibling;}return 1;};}(function(){var bR=av.createElement("div"),bS="script"+(new Date()).getTime(),e=av.documentElement;bR.innerHTML="<a name='"+bS+"'/>";e.insertBefore(bR,e.firstChild);if(av.getElementById(bS)){bE.find.ID=function(bU,bV,bW){if(typeof bV.getElementById!=="undefined"&&!bW){var bT=bV.getElementById(bU[1]);return bT?bT.id===bU[1]||typeof bT.getAttributeNode!=="undefined"&&bT.getAttributeNode("id").nodeValue===bU[1]?[bT]:L:[];}};bE.filter.ID=function(bV,bT){var bU=typeof bV.getAttributeNode!=="undefined"&&bV.getAttributeNode("id");return bV.nodeType===1&&bU&&bU.nodeValue===bT;};}e.removeChild(bR);e=bR=null;})();(function(){var e=av.createElement("div");e.appendChild(av.createComment(""));if(e.getElementsByTagName("*").length>0){bE.find.TAG=function(bR,bV){var bU=bV.getElementsByTagName(bR[1]);if(bR[1]==="*"){var bT=[];for(var bS=0;bU[bS];bS++){if(bU[bS].nodeType===1){bT.push(bU[bS]);}}bU=bT;}return bU;};}e.innerHTML="<a href='#'></a>";if(e.firstChild&&typeof e.firstChild.getAttribute!=="undefined"&&e.firstChild.getAttribute("href")!=="#"){bE.attrHandle.href=function(bR){return bR.getAttribute("href",2);};}e=null;})();if(av.querySelectorAll){(function(){var e=by,bT=av.createElement("div"),bS="__sizzle__";bT.innerHTML="<p class='TEST'></p>";if(bT.querySelectorAll&&bT.querySelectorAll(".TEST").length===0){return;}by=function(b4,bV,bZ,b3){bV=bV||av;if(!b3&&!by.isXML(bV)){var b2=/^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b4);if(b2&&(bV.nodeType===1||bV.nodeType===9)){if(b2[1]){return bF(bV.getElementsByTagName(b4),bZ);}else{if(b2[2]&&bE.find.CLASS&&bV.getElementsByClassName){return bF(bV.getElementsByClassName(b2[2]),bZ);}}}if(bV.nodeType===9){if(b4==="body"&&bV.body){return bF([bV.body],bZ);}else{if(b2&&b2[3]){var bY=bV.getElementById(b2[3]);if(bY&&bY.parentNode){if(bY.id===b2[3]){return bF([bY],bZ);}}else{return bF([],bZ);}}}try{return bF(bV.querySelectorAll(b4),bZ);}catch(b0){}}else{if(bV.nodeType===1&&bV.nodeName.toLowerCase()!=="object"){var bW=bV,bX=bV.getAttribute("id"),bU=bX||bS,b6=bV.parentNode,b5=/^\s*[+~]/.test(b4);if(!bX){bV.setAttribute("id",bU);}else{bU=bU.replace(/'/g,"\\$&");}if(b5&&b6){bV=bV.parentNode;}try{if(!b5||b6){return bF(bV.querySelectorAll("[id='"+bU+"'] "+b4),bZ);}}catch(b1){}finally{if(!bX){bW.removeAttribute("id");}}}}}return e(b4,bV,bZ,b3);};for(var bR in e){by[bR]=e[bR];}bT=null;})();}(function(){var e=av.documentElement,bS=e.matchesSelector||e.mozMatchesSelector||e.webkitMatchesSelector||e.msMatchesSelector;if(bS){var bU=!bS.call(av.createElement("div"),"div"),bR=false;try{bS.call(av.documentElement,"[test!='']:sizzle");}catch(bT){bR=true;}by.matchesSelector=function(bW,bY){bY=bY.replace(/\=\s*([^'"\]]*)\s*\]/g,"='$1']");if(!by.isXML(bW)){try{if(bR||!bE.match.PSEUDO.test(bY)&&!/!=/.test(bY)){var bV=bS.call(bW,bY);if(bV||!bU||bW.document&&bW.document.nodeType!==11){return bV;}}}catch(bX){}}return by(bY,null,null,[bW]).length>0;};}})();(function(){var e=av.createElement("div");e.innerHTML="<div class='test e'></div><div class='test'></div>";if(!e.getElementsByClassName||e.getElementsByClassName("e").length===0){return;}e.lastChild.className="e";if(e.getElementsByClassName("e").length===1){return;}bE.order.splice(1,0,"CLASS");bE.find.CLASS=function(bR,bS,bT){if(typeof bS.getElementsByClassName!=="undefined"&&!bT){return bS.getElementsByClassName(bR[1]);}};e=null;})();function bv(bR,bW,bV,bZ,bX,bY){for(var bT=0,bS=bZ.length;bT<bS;bT++){var e=bZ[bT];if(e){var bU=false;e=e[bR];while(e){if(e[bC]===bV){bU=bZ[e.sizset];break;}if(e.nodeType===1&&!bY){e[bC]=bV;e.sizset=bT;}if(e.nodeName.toLowerCase()===bW){bU=e;break;}e=e[bR];}bZ[bT]=bU;}}}function bN(bR,bW,bV,bZ,bX,bY){for(var bT=0,bS=bZ.length;bT<bS;bT++){var e=bZ[bT];if(e){var bU=false;e=e[bR];while(e){if(e[bC]===bV){bU=bZ[e.sizset];break;}if(e.nodeType===1){if(!bY){e[bC]=bV;e.sizset=bT;}if(typeof bW!=="string"){if(e===bW){bU=true;break;}}else{if(by.filter(bW,[e]).length>0){bU=e;break;}}}e=e[bR];}bZ[bT]=bU;}}}if(av.documentElement.contains){by.contains=function(bR,e){return bR!==e&&(bR.contains?bR.contains(e):true);};}else{if(av.documentElement.compareDocumentPosition){by.contains=function(bR,e){return !!(bR.compareDocumentPosition(e)&16);};}else{by.contains=function(){return false;};}}by.isXML=function(e){var bR=(e?e.ownerDocument||e:0).documentElement;return bR?bR.nodeName!=="HTML":false;};var bM=function(bS,e,bW){var bV,bX=[],bU="",bY=e.nodeType?[e]:e;while((bV=bE.match.PSEUDO.exec(bS))){bU+=bV[0];bS=bS.replace(bE.match.PSEUDO,"");}bS=bE.relative[bS]?bS+"*":bS;for(var bT=0,bR=bY.length;bT<bR;bT++){by(bS,bY[bT],bX,bW);}return by.filter(bU,bX);};by.attr=b.attr;by.selectors.attrMap={};b.find=by;b.expr=by.selectors;b.expr[":"]=b.expr.filters;b.unique=by.uniqueSort;b.text=by.getText;b.isXMLDoc=by.isXML;b.contains=by.contains;})();var ab=/Until$/,aq=/^(?:parents|prevUntil|prevAll)/,bb=/,/,bp=/^.[^:#\[\.,]*$/,P=Array.prototype.slice,H=b.expr.match.globalPOS,ay={children:true,contents:true,next:true,prev:true};b.fn.extend({find:function(e){var bw=this,by,bv;if(typeof e!=="string"){return b(e).filter(function(){for(by=0,bv=bw.length;by<bv;by++){if(b.contains(bw[by],this)){return true;}}});}var bx=this.pushStack("","find",e),bA,bB,bz;for(by=0,bv=this.length;by<bv;by++){bA=bx.length;b.find(e,this[by],bx);if(by>0){for(bB=bA;bB<bx.length;bB++){for(bz=0;bz<bA;bz++){if(bx[bz]===bx[bB]){bx.splice(bB--,1);break;}}}}}return bx;},has:function(bv){var e=b(bv);return this.filter(function(){for(var bx=0,bw=e.length;bx<bw;bx++){if(b.contains(this,e[bx])){return true;}}});},not:function(e){return this.pushStack(aH(this,e,false),"not",e);},filter:function(e){return this.pushStack(aH(this,e,true),"filter",e);},is:function(e){return !!e&&(typeof e==="string"?H.test(e)?b(e,this.context).index(this[0])>=0:b.filter(e,this).length>0:this.filter(e).length>0);},closest:function(by,bx){var bv=[],bw,e,bz=this[0];if(b.isArray(by)){var bB=1;while(bz&&bz.ownerDocument&&bz!==bx){for(bw=0;bw<by.length;bw++){if(b(bz).is(by[bw])){bv.push({selector:by[bw],elem:bz,level:bB});}}bz=bz.parentNode;bB++;}return bv;}var bA=H.test(by)||typeof by!=="string"?b(by,bx||this.context):0;for(bw=0,e=this.length;bw<e;bw++){bz=this[bw];while(bz){if(bA?bA.index(bz)>-1:b.find.matchesSelector(bz,by)){bv.push(bz);break;}else{bz=bz.parentNode;if(!bz||!bz.ownerDocument||bz===bx||bz.nodeType===11){break;}}}}bv=bv.length>1?b.unique(bv):bv;return this.pushStack(bv,"closest",by);},index:function(e){if(!e){return(this[0]&&this[0].parentNode)?this.prevAll().length:-1;}if(typeof e==="string"){return b.inArray(this[0],b(e));}return b.inArray(e.jquery?e[0]:e,this);},add:function(e,bv){var bx=typeof e==="string"?b(e,bv):b.makeArray(e&&e.nodeType?[e]:e),bw=b.merge(this.get(),bx);return this.pushStack(B(bx[0])||B(bw[0])?bw:b.unique(bw));},andSelf:function(){return this.add(this.prevObject);}});function B(e){return !e||!e.parentNode||e.parentNode.nodeType===11;}b.each({parent:function(bv){var e=bv.parentNode;return e&&e.nodeType!==11?e:null;},parents:function(e){return b.dir(e,"parentNode");},parentsUntil:function(bv,e,bw){return b.dir(bv,"parentNode",bw);},next:function(e){return b.nth(e,2,"nextSibling");},prev:function(e){return b.nth(e,2,"previousSibling");},nextAll:function(e){return b.dir(e,"nextSibling");},prevAll:function(e){return b.dir(e,"previousSibling");},nextUntil:function(bv,e,bw){return b.dir(bv,"nextSibling",bw);},prevUntil:function(bv,e,bw){return b.dir(bv,"previousSibling",bw);},siblings:function(e){return b.sibling((e.parentNode||{}).firstChild,e);},children:function(e){return b.sibling(e.firstChild);},contents:function(e){return b.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:b.makeArray(e.childNodes);}},function(e,bv){b.fn[e]=function(by,bw){var bx=b.map(this,bv,by);if(!ab.test(e)){bw=by;}if(bw&&typeof bw==="string"){bx=b.filter(bw,bx);}bx=this.length>1&&!ay[e]?b.unique(bx):bx;if((this.length>1||bb.test(bw))&&aq.test(e)){bx=bx.reverse();}return this.pushStack(bx,e,P.call(arguments).join(","));};});b.extend({filter:function(bw,e,bv){if(bv){bw=":not("+bw+")";}return e.length===1?b.find.matchesSelector(e[0],bw)?[e[0]]:[]:b.find.matches(bw,e);},dir:function(bw,bv,by){var e=[],bx=bw[bv];while(bx&&bx.nodeType!==9&&(by===L||bx.nodeType!==1||!b(bx).is(by))){if(bx.nodeType===1){e.push(bx);}bx=bx[bv];}return e;},nth:function(by,e,bw,bx){e=e||1;var bv=0;for(;by;by=by[bw]){if(by.nodeType===1&&++bv===e){break;}}return by;},sibling:function(bw,bv){var e=[];for(;bw;bw=bw.nextSibling){if(bw.nodeType===1&&bw!==bv){e.push(bw);}}return e;}});function aH(bx,bw,e){bw=bw||0;if(b.isFunction(bw)){return b.grep(bx,function(bz,by){var bA=!!bw.call(bz,by,bz);return bA===e;});}else{if(bw.nodeType){return b.grep(bx,function(bz,by){return(bz===bw)===e;});}else{if(typeof bw==="string"){var bv=b.grep(bx,function(by){return by.nodeType===1;});if(bp.test(bw)){return b.filter(bw,bv,!e);}else{bw=b.filter(bw,bv);}}}}return b.grep(bx,function(bz,by){return(b.inArray(bz,bw)>=0)===e;});}function a(e){var bw=aS.split("|"),bv=e.createDocumentFragment();if(bv.createElement){while(bw.length){bv.createElement(bw.pop());}}return bv;}var aS="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",ah=/ jQuery\d+="(?:\d+|null)"/g,ar=/^\s+/,R=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig,d=/<([\w:]+)/,v=/<tbody/i,W=/<|&#?\w+;/,ae=/<(?:script|style)/i,O=/<(?:script|object|embed|option|style)/i,ai=new RegExp("<(?:"+aS+")[\\s/>]","i"),o=/checked\s*(?:[^=]|=\s*.checked.)/i,bn=/\/(java|ecma)script/i,aO=/^\s*<!(?:\[CDATA\[|\-\-)/,ax={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],area:[1,"<map>","</map>"],_default:[0,"",""]},ac=a(av);ax.optgroup=ax.option;ax.tbody=ax.tfoot=ax.colgroup=ax.caption=ax.thead;ax.th=ax.td;if(!b.support.htmlSerialize){ax._default=[1,"div<div>","</div>"];}b.fn.extend({text:function(e){return b.access(this,function(bv){return bv===L?b.text(this):this.empty().append((this[0]&&this[0].ownerDocument||av).createTextNode(bv));},null,e,arguments.length);},wrapAll:function(e){if(b.isFunction(e)){return this.each(function(bw){b(this).wrapAll(e.call(this,bw));});}if(this[0]){var bv=b(e,this[0].ownerDocument).eq(0).clone(true);if(this[0].parentNode){bv.insertBefore(this[0]);}bv.map(function(){var bw=this;while(bw.firstChild&&bw.firstChild.nodeType===1){bw=bw.firstChild;}return bw;}).append(this);}return this;},wrapInner:function(e){if(b.isFunction(e)){return this.each(function(bv){b(this).wrapInner(e.call(this,bv));});}return this.each(function(){var bv=b(this),bw=bv.contents();if(bw.length){bw.wrapAll(e);}else{bv.append(e);}});},wrap:function(e){var bv=b.isFunction(e);return this.each(function(bw){b(this).wrapAll(bv?e.call(this,bw):e);});},unwrap:function(){return this.parent().each(function(){if(!b.nodeName(this,"body")){b(this).replaceWith(this.childNodes);}}).end();},append:function(){return this.domManip(arguments,true,function(e){if(this.nodeType===1){this.appendChild(e);}});},prepend:function(){return this.domManip(arguments,true,function(e){if(this.nodeType===1){this.insertBefore(e,this.firstChild);}});},before:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(bv){this.parentNode.insertBefore(bv,this);});}else{if(arguments.length){var e=b.clean(arguments);e.push.apply(e,this.toArray());return this.pushStack(e,"before",arguments);}}},after:function(){if(this[0]&&this[0].parentNode){return this.domManip(arguments,false,function(bv){this.parentNode.insertBefore(bv,this.nextSibling);});}else{if(arguments.length){var e=this.pushStack(this,"after",arguments);e.push.apply(e,b.clean(arguments));return e;}}},remove:function(e,bx){for(var bv=0,bw;(bw=this[bv])!=null;bv++){if(!e||b.filter(e,[bw]).length){if(!bx&&bw.nodeType===1){b.cleanData(bw.getElementsByTagName("*"));b.cleanData([bw]);}if(bw.parentNode){bw.parentNode.removeChild(bw);}}}return this;},empty:function(){for(var e=0,bv;(bv=this[e])!=null;e++){if(bv.nodeType===1){b.cleanData(bv.getElementsByTagName("*"));}while(bv.firstChild){bv.removeChild(bv.firstChild);}}return this;},clone:function(bv,e){bv=bv==null?false:bv;e=e==null?bv:e;return this.map(function(){return b.clone(this,bv,e);});},html:function(e){return b.access(this,function(by){var bx=this[0]||{},bw=0,bv=this.length;if(by===L){return bx.nodeType===1?bx.innerHTML.replace(ah,""):null;}if(typeof by==="string"&&!ae.test(by)&&(b.support.leadingWhitespace||!ar.test(by))&&!ax[(d.exec(by)||["",""])[1].toLowerCase()]){by=by.replace(R,"<$1></$2>");try{for(;bw<bv;bw++){bx=this[bw]||{};if(bx.nodeType===1){b.cleanData(bx.getElementsByTagName("*"));bx.innerHTML=by;}}bx=0;}catch(bz){}}if(bx){this.empty().append(by);}},null,e,arguments.length);},replaceWith:function(e){if(this[0]&&this[0].parentNode){if(b.isFunction(e)){return this.each(function(bx){var bw=b(this),bv=bw.html();bw.replaceWith(e.call(this,bx,bv));});}if(typeof e!=="string"){e=b(e).detach();}return this.each(function(){var bw=this.nextSibling,bv=this.parentNode;b(this).remove();if(bw){b(bw).before(e);}else{b(bv).append(e);}});}else{return this.length?this.pushStack(b(b.isFunction(e)?e():e),"replaceWith",e):this;}},detach:function(e){return this.remove(e,true);},domManip:function(bB,bF,bE){var bx,by,bA,bD,bC=bB[0],bv=[];if(!b.support.checkClone&&arguments.length===3&&typeof bC==="string"&&o.test(bC)){return this.each(function(){b(this).domManip(bB,bF,bE,true);});}if(b.isFunction(bC)){return this.each(function(bH){var bG=b(this);bB[0]=bC.call(this,bH,bF?bG.html():L);bG.domManip(bB,bF,bE);});}if(this[0]){bD=bC&&bC.parentNode;if(b.support.parentNode&&bD&&bD.nodeType===11&&bD.childNodes.length===this.length){bx={fragment:bD};}else{bx=b.buildFragment(bB,this,bv);}bA=bx.fragment;if(bA.childNodes.length===1){by=bA=bA.firstChild;}else{by=bA.firstChild;}if(by){bF=bF&&b.nodeName(by,"tr");for(var bw=0,e=this.length,bz=e-1;bw<e;bw++){bE.call(bF?bc(this[bw],by):this[bw],bx.cacheable||(e>1&&bw<bz)?b.clone(bA,true,true):bA);}}if(bv.length){b.each(bv,function(bG,bH){if(bH.src){b.ajax({type:"GET",global:false,url:bH.src,async:false,dataType:"script"});}else{b.globalEval((bH.text||bH.textContent||bH.innerHTML||"").replace(aO,"/*$0*/"));}if(bH.parentNode){bH.parentNode.removeChild(bH);}});}}return this;}});function bc(e,bv){return b.nodeName(e,"table")?(e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody"))):e;}function s(bB,bv){if(bv.nodeType!==1||!b.hasData(bB)){return;}var by,bx,e,bA=b._data(bB),bz=b._data(bv,bA),bw=bA.events;if(bw){delete bz.handle;bz.events={};for(by in bw){for(bx=0,e=bw[by].length;bx<e;bx++){b.event.add(bv,by,bw[by][bx]);}}}if(bz.data){bz.data=b.extend({},bz.data);}}function aj(bv,e){var bw;if(e.nodeType!==1){return;}if(e.clearAttributes){e.clearAttributes();}if(e.mergeAttributes){e.mergeAttributes(bv);}bw=e.nodeName.toLowerCase();if(bw==="object"){e.outerHTML=bv.outerHTML;}else{if(bw==="input"&&(bv.type==="checkbox"||bv.type==="radio")){if(bv.checked){e.defaultChecked=e.checked=bv.checked;}if(e.value!==bv.value){e.value=bv.value;}}else{if(bw==="option"){e.selected=bv.defaultSelected;}else{if(bw==="input"||bw==="textarea"){e.defaultValue=bv.defaultValue;}else{if(bw==="script"&&e.text!==bv.text){e.text=bv.text;}}}}}e.removeAttribute(b.expando);e.removeAttribute("_submit_attached");e.removeAttribute("_change_attached");}b.buildFragment=function(bz,bx,bv){var by,e,bw,bA,bB=bz[0];if(bx&&bx[0]){bA=bx[0].ownerDocument||bx[0];}if(!bA.createDocumentFragment){bA=av;}if(bz.length===1&&typeof bB==="string"&&bB.length<512&&bA===av&&bB.charAt(0)==="<"&&!O.test(bB)&&(b.support.checkClone||!o.test(bB))&&(b.support.html5Clone||!ai.test(bB))){e=true;bw=b.fragments[bB];if(bw&&bw!==1){by=bw;}}if(!by){by=bA.createDocumentFragment();b.clean(bz,bA,by,bv);}if(e){b.fragments[bB]=bw?by:1;}return{fragment:by,cacheable:e};};b.fragments={};b.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,bv){b.fn[e]=function(bw){var bz=[],bC=b(bw),bB=this.length===1&&this[0].parentNode;if(bB&&bB.nodeType===11&&bB.childNodes.length===1&&bC.length===1){bC[bv](this[0]);return this;}else{for(var bA=0,bx=bC.length;bA<bx;bA++){var by=(bA>0?this.clone(true):this).get();b(bC[bA])[bv](by);bz=bz.concat(by);}return this.pushStack(bz,e,bC.selector);}};});function bh(e){if(typeof e.getElementsByTagName!=="undefined"){return e.getElementsByTagName("*");}else{if(typeof e.querySelectorAll!=="undefined"){return e.querySelectorAll("*");}else{return[];}}}function az(e){if(e.type==="checkbox"||e.type==="radio"){e.defaultChecked=e.checked;}}function D(e){var bv=(e.nodeName||"").toLowerCase();if(bv==="input"){az(e);}else{if(bv!=="script"&&typeof e.getElementsByTagName!=="undefined"){b.grep(e.getElementsByTagName("input"),az);}}}function am(e){var bv=av.createElement("div");ac.appendChild(bv);bv.innerHTML=e.outerHTML;return bv.firstChild;}b.extend({clone:function(by,bA,bw){var e,bv,bx,bz=b.support.html5Clone||b.isXMLDoc(by)||!ai.test("<"+by.nodeName+">")?by.cloneNode(true):am(by);if((!b.support.noCloneEvent||!b.support.noCloneChecked)&&(by.nodeType===1||by.nodeType===11)&&!b.isXMLDoc(by)){aj(by,bz);e=bh(by);bv=bh(bz);for(bx=0;e[bx];++bx){if(bv[bx]){aj(e[bx],bv[bx]);}}}if(bA){s(by,bz);if(bw){e=bh(by);bv=bh(bz);for(bx=0;e[bx];++bx){s(e[bx],bv[bx]);}}}e=bv=null;return bz;},clean:function(bI,bw,bv,bx){var bA,bH,bD,bJ=[];bw=bw||av;if(typeof bw.createElement==="undefined"){bw=bw.ownerDocument||bw[0]&&bw[0].ownerDocument||av;}for(var bE=0,bG;(bG=bI[bE])!=null;bE++){if(typeof bG==="number"){bG+="";}if(!bG){continue;}if(typeof bG==="string"){if(!W.test(bG)){bG=bw.createTextNode(bG);}else{bG=bG.replace(R,"<$1></$2>");var bN=(d.exec(bG)||["",""])[1].toLowerCase(),bz=ax[bN]||ax._default,bK=bz[0],bB=bw.createElement("div"),bL=ac.childNodes,bM;if(bw===av){ac.appendChild(bB);}else{a(bw).appendChild(bB);}bB.innerHTML=bz[1]+bG+bz[2];while(bK--){bB=bB.lastChild;}if(!b.support.tbody){var by=v.test(bG),e=bN==="table"&&!by?bB.firstChild&&bB.firstChild.childNodes:bz[1]==="<table>"&&!by?bB.childNodes:[];for(bD=e.length-1;bD>=0;--bD){if(b.nodeName(e[bD],"tbody")&&!e[bD].childNodes.length){e[bD].parentNode.removeChild(e[bD]);}}}if(!b.support.leadingWhitespace&&ar.test(bG)){bB.insertBefore(bw.createTextNode(ar.exec(bG)[0]),bB.firstChild);}bG=bB.childNodes;if(bB){bB.parentNode.removeChild(bB);if(bL.length>0){bM=bL[bL.length-1];if(bM&&bM.parentNode){bM.parentNode.removeChild(bM);}}}}}var bF;if(!b.support.appendChecked){if(bG[0]&&typeof(bF=bG.length)==="number"){for(bD=0;bD<bF;bD++){D(bG[bD]);}}else{D(bG);}}if(bG.nodeType){bJ.push(bG);}else{bJ=b.merge(bJ,bG);}}if(bv){bA=function(bO){return !bO.type||bn.test(bO.type);};for(bE=0;bJ[bE];bE++){bH=bJ[bE];if(bx&&b.nodeName(bH,"script")&&(!bH.type||bn.test(bH.type))){bx.push(bH.parentNode?bH.parentNode.removeChild(bH):bH);}else{if(bH.nodeType===1){var bC=b.grep(bH.getElementsByTagName("script"),bA);bJ.splice.apply(bJ,[bE+1,0].concat(bC));}bv.appendChild(bH);}}}return bJ;},cleanData:function(bv){var by,bw,e=b.cache,bB=b.event.special,bA=b.support.deleteExpando;for(var bz=0,bx;(bx=bv[bz])!=null;bz++){if(bx.nodeName&&b.noData[bx.nodeName.toLowerCase()]){continue;}bw=bx[b.expando];if(bw){by=e[bw];if(by&&by.events){for(var bC in by.events){if(bB[bC]){b.event.remove(bx,bC);}else{b.removeEvent(bx,bC,by.handle);}}if(by.handle){by.handle.elem=null;}}if(bA){delete bx[b.expando];}else{if(bx.removeAttribute){bx.removeAttribute(b.expando);}}delete e[bw];}}}});var al=/alpha\([^)]*\)/i,au=/opacity=([^)]*)/,y=/([A-Z]|^ms)/g,bo=/^[\-+]?(?:\d*\.)?\d+$/i,a1=/^-?(?:\d*\.)?\d+(?!px)[^\d\s]+$/i,I=/^([\-+])=([\-+.\de]+)/,aE=/^margin/,a9={position:"absolute",visibility:"hidden",display:"block"},G=["Top","Right","Bottom","Left"],Z,aJ,aY;b.fn.css=function(e,bv){return b.access(this,function(bx,bw,by){return by!==L?b.style(bx,bw,by):b.css(bx,bw);},e,bv,arguments.length>1);};b.extend({cssHooks:{opacity:{get:function(bw,bv){if(bv){var e=Z(bw,"opacity");return e===""?"1":e;}else{return bw.style.opacity;}}}},cssNumber:{fillOpacity:true,fontWeight:true,lineHeight:true,opacity:true,orphans:true,widows:true,zIndex:true,zoom:true},cssProps:{"float":b.support.cssFloat?"cssFloat":"styleFloat"},style:function(bx,bw,bD,by){if(!bx||bx.nodeType===3||bx.nodeType===8||!bx.style){return;}var bB,bC,bz=b.camelCase(bw),bv=bx.style,bE=b.cssHooks[bz];bw=b.cssProps[bz]||bz;if(bD!==L){bC=typeof bD;if(bC==="string"&&(bB=I.exec(bD))){bD=(+(bB[1]+1)*+bB[2])+parseFloat(b.css(bx,bw));bC="number";}if(bD==null||bC==="number"&&isNaN(bD)){return;}if(bC==="number"&&!b.cssNumber[bz]){bD+="px";}if(!bE||!("set" in bE)||(bD=bE.set(bx,bD))!==L){try{bv[bw]=bD;}catch(bA){}}}else{if(bE&&"get" in bE&&(bB=bE.get(bx,false,by))!==L){return bB;}return bv[bw];}},css:function(by,bx,bv){var bw,e;bx=b.camelCase(bx);e=b.cssHooks[bx];bx=b.cssProps[bx]||bx;if(bx==="cssFloat"){bx="float";}if(e&&"get" in e&&(bw=e.get(by,true,bv))!==L){return bw;}else{if(Z){return Z(by,bx);}}},swap:function(by,bx,bz){var e={},bw,bv;for(bv in bx){e[bv]=by.style[bv];by.style[bv]=bx[bv];}bw=bz.call(by);for(bv in bx){by.style[bv]=e[bv];}return bw;}});b.curCSS=b.css;if(av.defaultView&&av.defaultView.getComputedStyle){aJ=function(bA,bw){var bv,bz,e,by,bx=bA.style;bw=bw.replace(y,"-$1").toLowerCase();if((bz=bA.ownerDocument.defaultView)&&(e=bz.getComputedStyle(bA,null))){bv=e.getPropertyValue(bw);if(bv===""&&!b.contains(bA.ownerDocument.documentElement,bA)){bv=b.style(bA,bw);}}if(!b.support.pixelMargin&&e&&aE.test(bw)&&a1.test(bv)){by=bx.width;bx.width=bv;bv=e.width;bx.width=by;}return bv;};}if(av.documentElement.currentStyle){aY=function(bz,bw){var bA,e,by,bv=bz.currentStyle&&bz.currentStyle[bw],bx=bz.style;if(bv==null&&bx&&(by=bx[bw])){bv=by;}if(a1.test(bv)){bA=bx.left;e=bz.runtimeStyle&&bz.runtimeStyle.left;if(e){bz.runtimeStyle.left=bz.currentStyle.left;}bx.left=bw==="fontSize"?"1em":bv;bv=bx.pixelLeft+"px";bx.left=bA;if(e){bz.runtimeStyle.left=e;}}return bv===""?"auto":bv;};}Z=aJ||aY;function af(by,bw,bv){var bz=bw==="width"?by.offsetWidth:by.offsetHeight,bx=bw==="width"?1:0,e=4;if(bz>0){if(bv!=="border"){for(;bx<e;bx+=2){if(!bv){bz-=parseFloat(b.css(by,"padding"+G[bx]))||0;}if(bv==="margin"){bz+=parseFloat(b.css(by,bv+G[bx]))||0;}else{bz-=parseFloat(b.css(by,"border"+G[bx]+"Width"))||0;}}}return bz+"px";}bz=Z(by,bw);if(bz<0||bz==null){bz=by.style[bw];}if(a1.test(bz)){return bz;}bz=parseFloat(bz)||0;if(bv){for(;bx<e;bx+=2){bz+=parseFloat(b.css(by,"padding"+G[bx]))||0;if(bv!=="padding"){bz+=parseFloat(b.css(by,"border"+G[bx]+"Width"))||0;}if(bv==="margin"){bz+=parseFloat(b.css(by,bv+G[bx]))||0;}}}return bz+"px";}b.each(["height","width"],function(bv,e){b.cssHooks[e]={get:function(by,bx,bw){if(bx){if(by.offsetWidth!==0){return af(by,e,bw);}else{return b.swap(by,a9,function(){return af(by,e,bw);});}}},set:function(bw,bx){return bo.test(bx)?bx+"px":bx;}};});if(!b.support.opacity){b.cssHooks.opacity={get:function(bv,e){return au.test((e&&bv.currentStyle?bv.currentStyle.filter:bv.style.filter)||"")?(parseFloat(RegExp.$1)/100)+"":e?"1":"";},set:function(by,bz){var bx=by.style,bv=by.currentStyle,e=b.isNumeric(bz)?"alpha(opacity="+bz*100+")":"",bw=bv&&bv.filter||bx.filter||"";bx.zoom=1;if(bz>=1&&b.trim(bw.replace(al,""))===""){bx.removeAttribute("filter");if(bv&&!bv.filter){return;}}bx.filter=al.test(bw)?bw.replace(al,e):bw+" "+e;}};}b(function(){if(!b.support.reliableMarginRight){b.cssHooks.marginRight={get:function(bv,e){return b.swap(bv,{display:"inline-block"},function(){if(e){return Z(bv,"margin-right");}else{return bv.style.marginRight;}});}};}});if(b.expr&&b.expr.filters){b.expr.filters.hidden=function(bw){var bv=bw.offsetWidth,e=bw.offsetHeight;return(bv===0&&e===0)||(!b.support.reliableHiddenOffsets&&((bw.style&&bw.style.display)||b.css(bw,"display"))==="none");};b.expr.filters.visible=function(e){return !b.expr.filters.hidden(e);};}b.each({margin:"",padding:"",border:"Width"},function(e,bv){b.cssHooks[e+bv]={expand:function(by){var bx,bz=typeof by==="string"?by.split(" "):[by],bw={};for(bx=0;bx<4;bx++){bw[e+G[bx]+bv]=bz[bx]||bz[bx-2]||bz[0];}return bw;}};});var k=/%20/g,ap=/\[\]$/,bs=/\r?\n/g,bq=/#.*$/,aD=/^(.*?):[ \t]*([^\r\n]*)\r?$/mg,a0=/^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,aN=/^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,aR=/^(?:GET|HEAD)$/,c=/^\/\//,M=/\?/,a7=/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,p=/^(?:select|textarea)/i,h=/\s+/,br=/([?&])_=[^&]*/,K=/^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/,z=b.fn.load,aa={},q={},aF,r,aW=["*/"]+["*"];try{aF=bm.href;}catch(aw){aF=av.createElement("a");aF.href="";aF=aF.href;}r=K.exec(aF.toLowerCase())||[];function f(e){return function(by,bA){if(typeof by!=="string"){bA=by;by="*";}if(b.isFunction(bA)){var bx=by.toLowerCase().split(h),bw=0,bz=bx.length,bv,bB,bC;for(;bw<bz;bw++){bv=bx[bw];bC=/^\+/.test(bv);if(bC){bv=bv.substr(1)||"*";}bB=e[bv]=e[bv]||[];bB[bC?"unshift":"push"](bA);}}};}function aX(bv,bE,bz,bD,bB,bx){bB=bB||bE.dataTypes[0];bx=bx||{};bx[bB]=true;var bA=bv[bB],bw=0,e=bA?bA.length:0,by=(bv===aa),bC;for(;bw<e&&(by||!bC);bw++){bC=bA[bw](bE,bz,bD);if(typeof bC==="string"){if(!by||bx[bC]){bC=L;}else{bE.dataTypes.unshift(bC);bC=aX(bv,bE,bz,bD,bC,bx);}}}if((by||!bC)&&!bx["*"]){bC=aX(bv,bE,bz,bD,"*",bx);}return bC;}function an(bw,bx){var bv,e,by=b.ajaxSettings.flatOptions||{};for(bv in bx){if(bx[bv]!==L){(by[bv]?bw:(e||(e={})))[bv]=bx[bv];}}if(e){b.extend(true,bw,e);}}b.fn.extend({load:function(bw,bz,bA){if(typeof bw!=="string"&&z){return z.apply(this,arguments);}else{if(!this.length){return this;}}var by=bw.indexOf(" ");if(by>=0){var e=bw.slice(by,bw.length);bw=bw.slice(0,by);}var bx="GET";if(bz){if(b.isFunction(bz)){bA=bz;bz=L;}else{if(typeof bz==="object"){bz=b.param(bz,b.ajaxSettings.traditional);bx="POST";}}}var bv=this;b.ajax({url:bw,type:bx,dataType:"html",data:bz,complete:function(bC,bB,bD){bD=bC.responseText;if(bC.isResolved()){bC.done(function(bE){bD=bE;});bv.html(e?b("<div>").append(bD.replace(a7,"")).find(e):bD);}if(bA){bv.each(bA,[bD,bB,bC]);}}});return this;},serialize:function(){return b.param(this.serializeArray());},serializeArray:function(){return this.map(function(){return this.elements?b.makeArray(this.elements):this;}).filter(function(){return this.name&&!this.disabled&&(this.checked||p.test(this.nodeName)||a0.test(this.type));}).map(function(e,bv){var bw=b(this).val();return bw==null?null:b.isArray(bw)?b.map(bw,function(by,bx){return{name:bv.name,value:by.replace(bs,"\r\n")};}):{name:bv.name,value:bw.replace(bs,"\r\n")};}).get();}});b.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),function(e,bv){b.fn[bv]=function(bw){return this.on(bv,bw);};});b.each(["get","post"],function(e,bv){b[bv]=function(bw,by,bz,bx){if(b.isFunction(by)){bx=bx||bz;bz=by;by=L;}return b.ajax({type:bv,url:bw,data:by,success:bz,dataType:bx});};});b.extend({getScript:function(e,bv){return b.get(e,L,bv,"script");},getJSON:function(e,bv,bw){return b.get(e,bv,bw,"json");},ajaxSetup:function(bv,e){if(e){an(bv,b.ajaxSettings);}else{e=bv;bv=b.ajaxSettings;}an(bv,e);return bv;},ajaxSettings:{url:aF,isLocal:aN.test(r[1]),global:true,type:"GET",contentType:"application/x-www-form-urlencoded; charset=UTF-8",processData:true,async:true,accepts:{xml:"application/xml, text/xml",html:"text/html",text:"text/plain",json:"application/json, text/javascript","*":aW},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText"},converters:{"* text":bd.String,"text html":true,"text json":b.parseJSON,"text xml":b.parseXML},flatOptions:{context:true,url:true}},ajaxPrefilter:f(aa),ajaxTransport:f(q),ajax:function(bz,bx){if(typeof bz==="object"){bx=bz;bz=L;}bx=bx||{};var bD=b.ajaxSetup({},bx),bS=bD.context||bD,bG=bS!==bD&&(bS.nodeType||bS instanceof b)?b(bS):b.event,bR=b.Deferred(),bN=b.Callbacks("once memory"),bB=bD.statusCode||{},bC,bH={},bO={},bQ,by,bL,bE,bI,bA=0,bw,bK,bJ={readyState:0,setRequestHeader:function(bT,bU){if(!bA){var e=bT.toLowerCase();bT=bO[e]=bO[e]||bT;bH[bT]=bU;}return this;},getAllResponseHeaders:function(){return bA===2?bQ:null;},getResponseHeader:function(bT){var e;if(bA===2){if(!by){by={};while((e=aD.exec(bQ))){by[e[1].toLowerCase()]=e[2];}}e=by[bT.toLowerCase()];}return e===L?null:e;},overrideMimeType:function(e){if(!bA){bD.mimeType=e;}return this;},abort:function(e){e=e||"abort";if(bL){bL.abort(e);}bF(0,e);return this;}};function bF(bZ,bU,b0,bW){if(bA===2){return;}bA=2;if(bE){clearTimeout(bE);}bL=L;bQ=bW||"";bJ.readyState=bZ>0?4:0;var bT,b4,b3,bX=bU,bY=b0?bk(bD,bJ,b0):L,bV,b2;if(bZ>=200&&bZ<300||bZ===304){if(bD.ifModified){if((bV=bJ.getResponseHeader("Last-Modified"))){b.lastModified[bC]=bV;}if((b2=bJ.getResponseHeader("Etag"))){b.etag[bC]=b2;}}if(bZ===304){bX="notmodified";bT=true;}else{try{b4=F(bD,bY);bX="success";bT=true;}catch(b1){bX="parsererror";b3=b1;}}}else{b3=bX;if(!bX||bZ){bX="error";if(bZ<0){bZ=0;}}}bJ.status=bZ;bJ.statusText=""+(bU||bX);if(bT){bR.resolveWith(bS,[b4,bX,bJ]);}else{bR.rejectWith(bS,[bJ,bX,b3]);}bJ.statusCode(bB);bB=L;if(bw){bG.trigger("ajax"+(bT?"Success":"Error"),[bJ,bD,bT?b4:b3]);}bN.fireWith(bS,[bJ,bX]);if(bw){bG.trigger("ajaxComplete",[bJ,bD]);if(!(--b.active)){b.event.trigger("ajaxStop");}}}bR.promise(bJ);bJ.success=bJ.done;bJ.error=bJ.fail;bJ.complete=bN.add;bJ.statusCode=function(bT){if(bT){var e;if(bA<2){for(e in bT){bB[e]=[bB[e],bT[e]];}}else{e=bT[bJ.status];bJ.then(e,e);}}return this;};bD.url=((bz||bD.url)+"").replace(bq,"").replace(c,r[1]+"//");bD.dataTypes=b.trim(bD.dataType||"*").toLowerCase().split(h);if(bD.crossDomain==null){bI=K.exec(bD.url.toLowerCase());bD.crossDomain=!!(bI&&(bI[1]!=r[1]||bI[2]!=r[2]||(bI[3]||(bI[1]==="http:"?80:443))!=(r[3]||(r[1]==="http:"?80:443))));}if(bD.data&&bD.processData&&typeof bD.data!=="string"){bD.data=b.param(bD.data,bD.traditional);}aX(aa,bD,bx,bJ);if(bA===2){return false;}bw=bD.global;bD.type=bD.type.toUpperCase();bD.hasContent=!aR.test(bD.type);if(bw&&b.active++===0){b.event.trigger("ajaxStart");}if(!bD.hasContent){if(bD.data){bD.url+=(M.test(bD.url)?"&":"?")+bD.data;delete bD.data;}bC=bD.url;if(bD.cache===false){var bv=b.now(),bP=bD.url.replace(br,"$1_="+bv);bD.url=bP+((bP===bD.url)?(M.test(bD.url)?"&":"?")+"_="+bv:"");}}if(bD.data&&bD.hasContent&&bD.contentType!==false||bx.contentType){bJ.setRequestHeader("Content-Type",bD.contentType);}if(bD.ifModified){bC=bC||bD.url;if(b.lastModified[bC]){bJ.setRequestHeader("If-Modified-Since",b.lastModified[bC]);}if(b.etag[bC]){bJ.setRequestHeader("If-None-Match",b.etag[bC]);}}bJ.setRequestHeader("Accept",bD.dataTypes[0]&&bD.accepts[bD.dataTypes[0]]?bD.accepts[bD.dataTypes[0]]+(bD.dataTypes[0]!=="*"?", "+aW+"; q=0.01":""):bD.accepts["*"]);for(bK in bD.headers){bJ.setRequestHeader(bK,bD.headers[bK]);}if(bD.beforeSend&&(bD.beforeSend.call(bS,bJ,bD)===false||bA===2)){bJ.abort();return false;}for(bK in {success:1,error:1,complete:1}){bJ[bK](bD[bK]);}bL=aX(q,bD,bx,bJ);if(!bL){bF(-1,"No Transport");}else{bJ.readyState=1;if(bw){bG.trigger("ajaxSend",[bJ,bD]);}if(bD.async&&bD.timeout>0){bE=setTimeout(function(){bJ.abort("timeout");},bD.timeout);}try{bA=1;bL.send(bH,bF);}catch(bM){if(bA<2){bF(-1,bM);}else{throw bM;}}}return bJ;},param:function(e,bw){var bv=[],by=function(bz,bA){bA=b.isFunction(bA)?bA():bA;bv[bv.length]=encodeURIComponent(bz)+"="+encodeURIComponent(bA);};if(bw===L){bw=b.ajaxSettings.traditional;}if(b.isArray(e)||(e.jquery&&!b.isPlainObject(e))){b.each(e,function(){by(this.name,this.value);});}else{for(var bx in e){u(bx,e[bx],bw,by);}}return bv.join("&").replace(k,"+");}});function u(bw,by,bv,bx){if(b.isArray(by)){b.each(by,function(bA,bz){if(bv||ap.test(bw)){bx(bw,bz);}else{u(bw+"["+(typeof bz==="object"?bA:"")+"]",bz,bv,bx);}});}else{if(!bv&&b.type(by)==="object"){for(var e in by){u(bw+"["+e+"]",by[e],bv,bx);}}else{bx(bw,by);}}}b.extend({active:0,lastModified:{},etag:{}});function bk(bD,bC,bz){var bv=bD.contents,bB=bD.dataTypes,bw=bD.responseFields,by,bA,bx,e;for(bA in bw){if(bA in bz){bC[bw[bA]]=bz[bA];}}while(bB[0]==="*"){bB.shift();if(by===L){by=bD.mimeType||bC.getResponseHeader("content-type");}}if(by){for(bA in bv){if(bv[bA]&&bv[bA].test(by)){bB.unshift(bA);break;}}}if(bB[0] in bz){bx=bB[0];}else{for(bA in bz){if(!bB[0]||bD.converters[bA+" "+bB[0]]){bx=bA;break;}if(!e){e=bA;}}bx=bx||e;}if(bx){if(bx!==bB[0]){bB.unshift(bx);}return bz[bx];}}function F(bH,bz){if(bH.dataFilter){bz=bH.dataFilter(bz,bH.dataType);}var bD=bH.dataTypes,bG={},bA,bE,bw=bD.length,bB,bC=bD[0],bx,by,bF,bv,e;for(bA=1;bA<bw;bA++){if(bA===1){for(bE in bH.converters){if(typeof bE==="string"){bG[bE.toLowerCase()]=bH.converters[bE];}}}bx=bC;bC=bD[bA];if(bC==="*"){bC=bx;}else{if(bx!=="*"&&bx!==bC){by=bx+" "+bC;bF=bG[by]||bG["* "+bC];if(!bF){e=L;for(bv in bG){bB=bv.split(" ");if(bB[0]===bx||bB[0]==="*"){e=bG[bB[1]+" "+bC];if(e){bv=bG[bv];if(bv===true){bF=e;}else{if(e===true){bF=bv;}}break;}}}}if(!(bF||e)){b.error("No conversion from "+by.replace(" "," to "));}if(bF!==true){bz=bF?bF(bz):e(bv(bz));}}}}return bz;}var aC=b.now(),t=/(\=)\?(&|$)|\?\?/i;b.ajaxSetup({jsonp:"callback",jsonpCallback:function(){return b.expando+"_"+(aC++);}});b.ajaxPrefilter("json jsonp",function(bD,bA,bC){var bx=(typeof bD.data==="string")&&/^application\/x\-www\-form\-urlencoded/.test(bD.contentType);if(bD.dataTypes[0]==="jsonp"||bD.jsonp!==false&&(t.test(bD.url)||bx&&t.test(bD.data))){var bB,bw=bD.jsonpCallback=b.isFunction(bD.jsonpCallback)?bD.jsonpCallback():bD.jsonpCallback,bz=bd[bw],e=bD.url,by=bD.data,bv="$1"+bw+"$2";if(bD.jsonp!==false){e=e.replace(t,bv);if(bD.url===e){if(bx){by=by.replace(t,bv);}if(bD.data===by){e+=(/\?/.test(e)?"&":"?")+bD.jsonp+"="+bw;}}}bD.url=e;bD.data=by;bd[bw]=function(bE){bB=[bE];};bC.always(function(){bd[bw]=bz;if(bB&&b.isFunction(bz)){bd[bw](bB[0]);}});bD.converters["script json"]=function(){if(!bB){b.error(bw+" was not called");}return bB[0];};bD.dataTypes[0]="json";return"script";}});b.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/javascript|ecmascript/},converters:{"text script":function(e){b.globalEval(e);return e;}}});b.ajaxPrefilter("script",function(e){if(e.cache===L){e.cache=false;}if(e.crossDomain){e.type="GET";e.global=false;}});b.ajaxTransport("script",function(bw){if(bw.crossDomain){var e,bv=av.head||av.getElementsByTagName("head")[0]||av.documentElement;return{send:function(bx,by){e=av.createElement("script");e.async="async";if(bw.scriptCharset){e.charset=bw.scriptCharset;}e.src=bw.url;e.onload=e.onreadystatechange=function(bA,bz){if(bz||!e.readyState||/loaded|complete/.test(e.readyState)){e.onload=e.onreadystatechange=null;if(bv&&e.parentNode){bv.removeChild(e);}e=L;if(!bz){by(200,"success");}}};bv.insertBefore(e,bv.firstChild);},abort:function(){if(e){e.onload(0,1);}}};}});var A=bd.ActiveXObject?function(){for(var e in N){N[e](0,1);}}:false,x=0,N;function aM(){try{return new bd.XMLHttpRequest();}catch(bv){}}function ak(){try{return new bd.ActiveXObject("Microsoft.XMLHTTP");}catch(bv){}}b.ajaxSettings.xhr=bd.ActiveXObject?function(){return !this.isLocal&&aM()||ak();}:aM;(function(e){b.extend(b.support,{ajax:!!e,cors:!!e&&("withCredentials" in e)});})(b.ajaxSettings.xhr());if(b.support.ajax){b.ajaxTransport(function(e){if(!e.crossDomain||b.support.cors){var bv;return{send:function(bB,bw){var bA=e.xhr(),bz,by;if(e.username){bA.open(e.type,e.url,e.async,e.username,e.password);}else{bA.open(e.type,e.url,e.async);}if(e.xhrFields){for(by in e.xhrFields){bA[by]=e.xhrFields[by];}}if(e.mimeType&&bA.overrideMimeType){bA.overrideMimeType(e.mimeType);}if(!e.crossDomain&&!bB["X-Requested-With"]){bB["X-Requested-With"]="XMLHttpRequest";}try{for(by in bB){bA.setRequestHeader(by,bB[by]);}}catch(bx){}bA.send((e.hasContent&&e.data)||null);bv=function(bK,bE){var bF,bD,bC,bI,bH;try{if(bv&&(bE||bA.readyState===4)){bv=L;if(bz){bA.onreadystatechange=b.noop;if(A){delete N[bz];}}if(bE){if(bA.readyState!==4){bA.abort();}}else{bF=bA.status;bC=bA.getAllResponseHeaders();bI={};bH=bA.responseXML;if(bH&&bH.documentElement){bI.xml=bH;}try{bI.text=bA.responseText;}catch(bK){}try{bD=bA.statusText;}catch(bJ){bD="";}if(!bF&&e.isLocal&&!e.crossDomain){bF=bI.text?200:404;}else{if(bF===1223){bF=204;}}}}}catch(bG){if(!bE){bw(-1,bG);}}if(bI){bw(bF,bD,bI,bC);}};if(!e.async||bA.readyState===4){bv();}else{bz=++x;if(A){if(!N){N={};b(bd).unload(A);}N[bz]=bv;}bA.onreadystatechange=bv;}},abort:function(){if(bv){bv(0,1);}}};}});}var Q={},ba,m,aB=/^(?:toggle|show|hide)$/,aU=/^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i,a4,aI=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]],a5;b.fn.extend({show:function(bx,bA,bz){var bw,by;if(bx||bx===0){return this.animate(a2("show",3),bx,bA,bz);}else{for(var bv=0,e=this.length;bv<e;bv++){bw=this[bv];if(bw.style){by=bw.style.display;if(!b._data(bw,"olddisplay")&&by==="none"){by=bw.style.display="";}if((by===""&&b.css(bw,"display")==="none")||!b.contains(bw.ownerDocument.documentElement,bw)){b._data(bw,"olddisplay",w(bw.nodeName));}}}for(bv=0;bv<e;bv++){bw=this[bv];if(bw.style){by=bw.style.display;if(by===""||by==="none"){bw.style.display=b._data(bw,"olddisplay")||"";}}}return this;}},hide:function(bx,bA,bz){if(bx||bx===0){return this.animate(a2("hide",3),bx,bA,bz);}else{var bw,by,bv=0,e=this.length;for(;bv<e;bv++){bw=this[bv];if(bw.style){by=b.css(bw,"display");if(by!=="none"&&!b._data(bw,"olddisplay")){b._data(bw,"olddisplay",by);}}}for(bv=0;bv<e;bv++){if(this[bv].style){this[bv].style.display="none";}}return this;}},_toggle:b.fn.toggle,toggle:function(bw,bv,bx){var e=typeof bw==="boolean";if(b.isFunction(bw)&&b.isFunction(bv)){this._toggle.apply(this,arguments);}else{if(bw==null||e){this.each(function(){var by=e?bw:b(this).is(":hidden");b(this)[by?"show":"hide"]();});}else{this.animate(a2("toggle",3),bw,bv,bx);}}return this;},fadeTo:function(e,bx,bw,bv){return this.filter(":hidden").css("opacity",0).show().end().animate({opacity:bx},e,bw,bv);},animate:function(bz,bw,by,bx){var e=b.speed(bw,by,bx);if(b.isEmptyObject(bz)){return this.each(e.complete,[false]);}bz=b.extend({},bz);function bv(){if(e.queue===false){b._mark(this);}var bE=b.extend({},e),bL=this.nodeType===1,bJ=bL&&b(this).is(":hidden"),bB,bG,bD,bK,bN,bF,bI,bC,bH,bM,bA;bE.animatedProperties={};for(bD in bz){bB=b.camelCase(bD);if(bD!==bB){bz[bB]=bz[bD];delete bz[bD];}if((bN=b.cssHooks[bB])&&"expand" in bN){bF=bN.expand(bz[bB]);delete bz[bB];for(bD in bF){if(!(bD in bz)){bz[bD]=bF[bD];}}}}for(bB in bz){bG=bz[bB];if(b.isArray(bG)){bE.animatedProperties[bB]=bG[1];bG=bz[bB]=bG[0];}else{bE.animatedProperties[bB]=bE.specialEasing&&bE.specialEasing[bB]||bE.easing||"swing";}if(bG==="hide"&&bJ||bG==="show"&&!bJ){return bE.complete.call(this);}if(bL&&(bB==="height"||bB==="width")){bE.overflow=[this.style.overflow,this.style.overflowX,this.style.overflowY];if(b.css(this,"display")==="inline"&&b.css(this,"float")==="none"){if(!b.support.inlineBlockNeedsLayout||w(this.nodeName)==="inline"){this.style.display="inline-block";}else{this.style.zoom=1;}}}}if(bE.overflow!=null){this.style.overflow="hidden";}for(bD in bz){bK=new b.fx(this,bE,bD);bG=bz[bD];if(aB.test(bG)){bA=b._data(this,"toggle"+bD)||(bG==="toggle"?bJ?"show":"hide":0);if(bA){b._data(this,"toggle"+bD,bA==="show"?"hide":"show");bK[bA]();}else{bK[bG]();}}else{bI=aU.exec(bG);bC=bK.cur();if(bI){bH=parseFloat(bI[2]);bM=bI[3]||(b.cssNumber[bD]?"":"px");if(bM!=="px"){b.style(this,bD,(bH||1)+bM);bC=((bH||1)/bK.cur())*bC;b.style(this,bD,bC+bM);}if(bI[1]){bH=((bI[1]==="-="?-1:1)*bH)+bC;}bK.custom(bC,bH,bM);}else{bK.custom(bC,bG,"");}}}return true;}return e.queue===false?this.each(bv):this.queue(e.queue,bv);},stop:function(bw,bv,e){if(typeof bw!=="string"){e=bv;bv=bw;bw=L;}if(bv&&bw!==false){this.queue(bw||"fx",[]);}return this.each(function(){var bx,by=false,bA=b.timers,bz=b._data(this);if(!e){b._unmark(true,this);}function bB(bE,bF,bD){var bC=bF[bD];b.removeData(bE,bD,true);bC.stop(e);}if(bw==null){for(bx in bz){if(bz[bx]&&bz[bx].stop&&bx.indexOf(".run")===bx.length-4){bB(this,bz,bx);}}}else{if(bz[bx=bw+".run"]&&bz[bx].stop){bB(this,bz,bx);}}for(bx=bA.length;bx--;){if(bA[bx].elem===this&&(bw==null||bA[bx].queue===bw)){if(e){bA[bx](true);}else{bA[bx].saveState();}by=true;bA.splice(bx,1);}}if(!(e&&by)){b.dequeue(this,bw);}});}});function bi(){setTimeout(at,0);return(a5=b.now());}function at(){a5=L;}function a2(bv,e){var bw={};b.each(aI.concat.apply([],aI.slice(0,e)),function(){bw[this]=bv;});return bw;}b.each({slideDown:a2("show",1),slideUp:a2("hide",1),slideToggle:a2("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,bv){b.fn[e]=function(bw,by,bx){return this.animate(bv,bw,by,bx);};});b.extend({speed:function(bw,bx,bv){var e=bw&&typeof bw==="object"?b.extend({},bw):{complete:bv||!bv&&bx||b.isFunction(bw)&&bw,duration:bw,easing:bv&&bx||bx&&!b.isFunction(bx)&&bx};e.duration=b.fx.off?0:typeof e.duration==="number"?e.duration:e.duration in b.fx.speeds?b.fx.speeds[e.duration]:b.fx.speeds._default;if(e.queue==null||e.queue===true){e.queue="fx";}e.old=e.complete;e.complete=function(by){if(b.isFunction(e.old)){e.old.call(this);}if(e.queue){b.dequeue(this,e.queue);}else{if(by!==false){b._unmark(this);}}};return e;},easing:{linear:function(e){return e;},swing:function(e){return(-Math.cos(e*Math.PI)/2)+0.5;}},timers:[],fx:function(bv,e,bw){this.options=e;this.elem=bv;this.prop=bw;e.orig=e.orig||{};}});b.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this);}(b.fx.step[this.prop]||b.fx.step._default)(this);},cur:function(){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop];}var e,bv=b.css(this.elem,this.prop);return isNaN(e=parseFloat(bv))?!bv||bv==="auto"?0:bv:e;},custom:function(bz,by,bx){var e=this,bw=b.fx;this.startTime=a5||bi();this.end=by;this.now=this.start=bz;this.pos=this.state=0;this.unit=bx||this.unit||(b.cssNumber[this.prop]?"":"px");function bv(bA){return e.step(bA);}bv.queue=this.options.queue;bv.elem=this.elem;bv.saveState=function(){if(b._data(e.elem,"fxshow"+e.prop)===L){if(e.options.hide){b._data(e.elem,"fxshow"+e.prop,e.start);}else{if(e.options.show){b._data(e.elem,"fxshow"+e.prop,e.end);}}}};if(bv()&&b.timers.push(bv)&&!a4){a4=setInterval(bw.tick,bw.interval);}},show:function(){var e=b._data(this.elem,"fxshow"+this.prop);this.options.orig[this.prop]=e||b.style(this.elem,this.prop);this.options.show=true;if(e!==L){this.custom(this.cur(),e);}else{this.custom(this.prop==="width"||this.prop==="height"?1:0,this.cur());}b(this.elem).show();},hide:function(){this.options.orig[this.prop]=b._data(this.elem,"fxshow"+this.prop)||b.style(this.elem,this.prop);this.options.hide=true;this.custom(this.cur(),0);},step:function(by){var bA,bB,bv,bx=a5||bi(),e=true,bz=this.elem,bw=this.options;if(by||bx>=bw.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();bw.animatedProperties[this.prop]=true;for(bA in bw.animatedProperties){if(bw.animatedProperties[bA]!==true){e=false;}}if(e){if(bw.overflow!=null&&!b.support.shrinkWrapBlocks){b.each(["","X","Y"],function(bC,bD){bz.style["overflow"+bD]=bw.overflow[bC];});}if(bw.hide){b(bz).hide();}if(bw.hide||bw.show){for(bA in bw.animatedProperties){b.style(bz,bA,bw.orig[bA]);b.removeData(bz,"fxshow"+bA,true);b.removeData(bz,"toggle"+bA,true);}}bv=bw.complete;if(bv){bw.complete=false;bv.call(bz);}}return false;}else{if(bw.duration==Infinity){this.now=bx;}else{bB=bx-this.startTime;this.state=bB/bw.duration;this.pos=b.easing[bw.animatedProperties[this.prop]](this.state,bB,0,1,bw.duration);this.now=this.start+((this.end-this.start)*this.pos);}this.update();}return true;}};b.extend(b.fx,{tick:function(){var bw,bv=b.timers,e=0;for(;e<bv.length;e++){bw=bv[e];if(!bw()&&bv[e]===bw){bv.splice(e--,1);}}if(!bv.length){b.fx.stop();}},interval:13,stop:function(){clearInterval(a4);a4=null;},speeds:{slow:600,fast:200,_default:400},step:{opacity:function(e){b.style(e.elem,"opacity",e.now);},_default:function(e){if(e.elem.style&&e.elem.style[e.prop]!=null){e.elem.style[e.prop]=e.now+e.unit;}else{e.elem[e.prop]=e.now;}}}});b.each(aI.concat.apply([],aI),function(e,bv){if(bv.indexOf("margin")){b.fx.step[bv]=function(bw){b.style(bw.elem,bv,Math.max(0,bw.now)+bw.unit);};}});if(b.expr&&b.expr.filters){b.expr.filters.animated=function(e){return b.grep(b.timers,function(bv){return e===bv.elem;}).length;};}function w(bx){if(!Q[bx]){var e=av.body,bv=b("<"+bx+">").appendTo(e),bw=bv.css("display");bv.remove();if(bw==="none"||bw===""){if(!ba){ba=av.createElement("iframe");ba.frameBorder=ba.width=ba.height=0;}e.appendChild(ba);if(!m||!ba.createElement){m=(ba.contentWindow||ba.contentDocument).document;m.write((b.support.boxModel?"<!doctype html>":"")+"<html><body>");m.close();}bv=m.createElement(bx);m.body.appendChild(bv);bw=b.css(bv,"display");e.removeChild(ba);}Q[bx]=bw;}return Q[bx];}var a8,V=/^t(?:able|d|h)$/i,ad=/^(?:body|html)$/i;if("getBoundingClientRect" in av.documentElement){a8=function(by,bH,bw,bB){try{bB=by.getBoundingClientRect();}catch(bF){}if(!bB||!b.contains(bw,by)){return bB?{top:bB.top,left:bB.left}:{top:0,left:0};}var bC=bH.body,bD=aL(bH),bA=bw.clientTop||bC.clientTop||0,bE=bw.clientLeft||bC.clientLeft||0,bv=bD.pageYOffset||b.support.boxModel&&bw.scrollTop||bC.scrollTop,bz=bD.pageXOffset||b.support.boxModel&&bw.scrollLeft||bC.scrollLeft,bG=bB.top+bv-bA,bx=bB.left+bz-bE;return{top:bG,left:bx};};}else{a8=function(bz,bE,bx){var bC,bw=bz.offsetParent,bv=bz,bA=bE.body,bB=bE.defaultView,e=bB?bB.getComputedStyle(bz,null):bz.currentStyle,bD=bz.offsetTop,by=bz.offsetLeft;while((bz=bz.parentNode)&&bz!==bA&&bz!==bx){if(b.support.fixedPosition&&e.position==="fixed"){break;}bC=bB?bB.getComputedStyle(bz,null):bz.currentStyle;bD-=bz.scrollTop;by-=bz.scrollLeft;if(bz===bw){bD+=bz.offsetTop;by+=bz.offsetLeft;if(b.support.doesNotAddBorder&&!(b.support.doesAddBorderForTableAndCells&&V.test(bz.nodeName))){bD+=parseFloat(bC.borderTopWidth)||0;by+=parseFloat(bC.borderLeftWidth)||0;}bv=bw;bw=bz.offsetParent;}if(b.support.subtractsBorderForOverflowNotVisible&&bC.overflow!=="visible"){bD+=parseFloat(bC.borderTopWidth)||0;by+=parseFloat(bC.borderLeftWidth)||0;}e=bC;}if(e.position==="relative"||e.position==="static"){bD+=bA.offsetTop;by+=bA.offsetLeft;}if(b.support.fixedPosition&&e.position==="fixed"){bD+=Math.max(bx.scrollTop,bA.scrollTop);by+=Math.max(bx.scrollLeft,bA.scrollLeft);}return{top:bD,left:by};};}b.fn.offset=function(e){if(arguments.length){return e===L?this:this.each(function(bx){b.offset.setOffset(this,e,bx);});}var bv=this[0],bw=bv&&bv.ownerDocument;if(!bw){return null;}if(bv===bw.body){return b.offset.bodyOffset(bv);}return a8(bv,bw,bw.documentElement);};b.offset={bodyOffset:function(e){var bw=e.offsetTop,bv=e.offsetLeft;if(b.support.doesNotIncludeMarginInBodyOffset){bw+=parseFloat(b.css(e,"marginTop"))||0;bv+=parseFloat(b.css(e,"marginLeft"))||0;}return{top:bw,left:bv};},setOffset:function(bx,bG,bA){var bB=b.css(bx,"position");if(bB==="static"){bx.style.position="relative";}var bz=b(bx),bv=bz.offset(),e=b.css(bx,"top"),bE=b.css(bx,"left"),bF=(bB==="absolute"||bB==="fixed")&&b.inArray("auto",[e,bE])>-1,bD={},bC={},bw,by;if(bF){bC=bz.position();bw=bC.top;by=bC.left;}else{bw=parseFloat(e)||0;by=parseFloat(bE)||0;}if(b.isFunction(bG)){bG=bG.call(bx,bA,bv);}if(bG.top!=null){bD.top=(bG.top-bv.top)+bw;}if(bG.left!=null){bD.left=(bG.left-bv.left)+by;}if("using" in bG){bG.using.call(bx,bD);}else{bz.css(bD);}}};b.fn.extend({position:function(){if(!this[0]){return null;}var bw=this[0],bv=this.offsetParent(),bx=this.offset(),e=ad.test(bv[0].nodeName)?{top:0,left:0}:bv.offset();bx.top-=parseFloat(b.css(bw,"marginTop"))||0;bx.left-=parseFloat(b.css(bw,"marginLeft"))||0;e.top+=parseFloat(b.css(bv[0],"borderTopWidth"))||0;e.left+=parseFloat(b.css(bv[0],"borderLeftWidth"))||0;return{top:bx.top-e.top,left:bx.left-e.left};},offsetParent:function(){return this.map(function(){var e=this.offsetParent||av.body;while(e&&(!ad.test(e.nodeName)&&b.css(e,"position")==="static")){e=e.offsetParent;}return e;});}});b.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(bw,bv){var e=/Y/.test(bv);b.fn[bw]=function(bx){return b.access(this,function(by,bB,bA){var bz=aL(by);if(bA===L){return bz?(bv in bz)?bz[bv]:b.support.boxModel&&bz.document.documentElement[bB]||bz.document.body[bB]:by[bB];}if(bz){bz.scrollTo(!e?bA:b(bz).scrollLeft(),e?bA:b(bz).scrollTop());}else{by[bB]=bA;}},bw,bx,arguments.length,null);};});function aL(e){return b.isWindow(e)?e:e.nodeType===9?e.defaultView||e.parentWindow:false;}b.each({Height:"height",Width:"width"},function(bw,bx){var bv="client"+bw,e="scroll"+bw,by="offset"+bw;b.fn["inner"+bw]=function(){var bz=this[0];return bz?bz.style?parseFloat(b.css(bz,bx,"padding")):this[bx]():null;};b.fn["outer"+bw]=function(bA){var bz=this[0];return bz?bz.style?parseFloat(b.css(bz,bx,bA?"margin":"border")):this[bx]():null;};b.fn[bx]=function(bz){return b.access(this,function(bC,bB,bD){var bF,bE,bG,bA;if(b.isWindow(bC)){bF=bC.document;bE=bF.documentElement[bv];return b.support.boxModel&&bE||bF.body&&bF.body[bv]||bE;}if(bC.nodeType===9){bF=bC.documentElement;if(bF[bv]>=bF[e]){return bF[bv];}return Math.max(bC.body[e],bF[e],bC.body[by],bF[by]);}if(bD===L){bG=b.css(bC,bB);bA=parseFloat(bG);return b.isNumeric(bA)?bA:bG;}b(bC).css(bB,bD);},bx,bz,arguments.length,null);};});bd.jQuery=bd.$=b;if(typeof define==="function"&&define.amd&&define.amd.jQuery){define("jquery",[],function(){return b;});}})(window);
/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * Licensed under The MIT License
 *
 * @version        2.4.5
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/raty
 * 
 */


;(function(b){var a={init:function(c){return this.each(function(){var d=this,h=b(d).empty();d.opt=b.extend(true,{},b.fn.raty.defaults,c);h.data("settings",d.opt);d.opt.number=a.between(d.opt.number,0,20);if(d.opt.path.substring(d.opt.path.length-1,d.opt.path.length)!="/"){d.opt.path+="/";}if(typeof d.opt.score=="function"){d.opt.score=d.opt.score.call(d);}if(d.opt.score){d.opt.score=a.between(d.opt.score,0,d.opt.number);}for(var e=1;e<=d.opt.number;e++){b("<img />",{src:d.opt.path+((!d.opt.score||d.opt.score<e)?d.opt.starOff:d.opt.starOn),alt:e,title:(e<=d.opt.hints.length&&d.opt.hints[e-1]!==null)?d.opt.hints[e-1]:e}).appendTo(d);if(d.opt.space){h.append((e<d.opt.number)?"&#160;":"");}}d.stars=h.children('img:not(".raty-cancel")');d.score=b("<input />",{type:"hidden",name:d.opt.scoreName}).appendTo(d);if(d.opt.score&&d.opt.score>0){d.score.val(d.opt.score);a.roundStar.call(d,d.opt.score);}if(d.opt.iconRange){a.fill.call(d,d.opt.score);}a.setTarget.call(d,d.opt.score,d.opt.targetKeep);var g=d.opt.space?4:0,f=d.opt.width||(d.opt.number*d.opt.size+d.opt.number*g);if(d.opt.cancel){d.cancel=b("<img />",{src:d.opt.path+d.opt.cancelOff,alt:"x",title:d.opt.cancelHint,"class":"raty-cancel"});if(d.opt.cancelPlace=="left"){h.prepend("&#160;").prepend(d.cancel);}else{h.append("&#160;").append(d.cancel);}f+=(d.opt.size+g);}if(d.opt.readOnly){a.fixHint.call(d);if(d.cancel){d.cancel.hide();}}else{h.css("cursor","pointer");a.bindAction.call(d);}h.css("width",f);});},between:function(e,d,c){return Math.min(Math.max(parseFloat(e),d),c);},bindAction:function(){var c=this,e=b(c);e.mouseleave(function(){var f=c.score.val()||undefined;a.initialize.call(c,f);a.setTarget.call(c,f,c.opt.targetKeep);if(c.opt.mouseover){c.opt.mouseover.call(c,f);}});var d=c.opt.half?"mousemove":"mouseover";if(c.opt.cancel){c.cancel.mouseenter(function(){b(this).attr("src",c.opt.path+c.opt.cancelOn);c.stars.attr("src",c.opt.path+c.opt.starOff);a.setTarget.call(c,null,true);if(c.opt.mouseover){c.opt.mouseover.call(c,null);}}).mouseleave(function(){b(this).attr("src",c.opt.path+c.opt.cancelOff);if(c.opt.mouseover){c.opt.mouseover.call(c,c.score.val()||null);}}).click(function(f){c.score.removeAttr("value");if(c.opt.click){c.opt.click.call(c,null,f);}});}c.stars.bind(d,function(g){var h=parseInt(this.alt,10);if(c.opt.half){var f=parseFloat((g.pageX-b(this).offset().left)/c.opt.size),i=(f>0.5)?1:0.5;h=parseFloat(this.alt)-1+i;a.fill.call(c,h);if(c.opt.precision){h=h-i+f;}a.showHalf.call(c,h);}else{a.fill.call(c,h);}e.data("score",h);a.setTarget.call(c,h,true);if(c.opt.mouseover){c.opt.mouseover.call(c,h,g);}}).click(function(f){c.score.val((c.opt.half||c.opt.precision)?e.data("score"):this.alt);if(c.opt.click){c.opt.click.call(c,c.score.val(),f);}});},cancel:function(c){return b(this).each(function(){var d=this,e=b(d);if(e.data("readonly")===true){return this;}if(c){a.click.call(d,null);}else{a.score.call(d,null);}d.score.removeAttr("value");});},click:function(c){return b(this).each(function(){if(b(this).data("readonly")===true){return this;}a.initialize.call(this,c);if(this.opt.click){this.opt.click.call(this,c);}else{a.error.call(this,'you must add the "click: function(score, evt) { }" callback.');}a.setTarget.call(this,c,true);});},error:function(c){b(this).html(c);b.error(c);},fill:function(k){var c=this,h=c.stars.length,g=0,d,j,f;for(var e=1;e<=h;e++){d=c.stars.eq(e-1);if(c.opt.iconRange&&c.opt.iconRange.length>g){j=c.opt.iconRange[g];if(c.opt.single){f=(e==k)?(j.on||c.opt.starOn):(j.off||c.opt.starOff);}else{f=(e<=k)?(j.on||c.opt.starOn):(j.off||c.opt.starOff);}if(e<=j.range){d.attr("src",c.opt.path+f);}if(e==j.range){g++;}}else{if(c.opt.single){f=(e==k)?c.opt.starOn:c.opt.starOff;}else{f=(e<=k)?c.opt.starOn:c.opt.starOff;}d.attr("src",c.opt.path+f);}}},fixHint:function(){var c=b(this),e=parseInt(this.score.val(),10),d=this.opt.noRatedMsg;if(!isNaN(e)&&e>0){d=(e<=this.opt.hints.length&&this.opt.hints[e-1]!==null)?this.opt.hints[e-1]:e;}c.data("readonly",true).css("cursor","default").attr("title",d);this.score.attr("readonly","readonly");this.stars.attr("title",d);},getScore:function(){var d=[],c;b(this).each(function(){c=this.score.val();d.push(c?parseFloat(c):undefined);});return(d.length>1)?d:d[0];},readOnly:function(c){return this.each(function(){var d=b(this);if(d.data("readonly")===c){return this;}if(this.cancel){if(c){this.cancel.hide();}else{this.cancel.show();}}if(c){d.unbind();d.children("img").unbind();a.fixHint.call(this);}else{a.bindAction.call(this);a.unfixHint.call(this);}d.data("readonly",c);});},reload:function(){return a.set.call(this,{});},roundStar:function(e){var d=(e-Math.floor(e)).toFixed(2);if(d>this.opt.round.down){var c=this.opt.starOn;if(d<this.opt.round.up&&this.opt.halfShow){c=this.opt.starHalf;}else{if(d<this.opt.round.full){c=this.opt.starOff;}}this.stars.eq(Math.ceil(e)-1).attr("src",this.opt.path+c);}},score:function(){return arguments.length?a.setScore.apply(this,arguments):a.getScore.call(this);},set:function(c){this.each(function(){var d=b(this),f=d.data("settings"),e=d.clone().removeAttr("style").insertBefore(d);d.remove();e.raty(b.extend(f,c));});return b(this.selector);},setScore:function(c){return b(this).each(function(){if(b(this).data("readonly")===true){return this;}a.initialize.call(this,c);a.setTarget.call(this,c,true);});},setTarget:function(e,d){if(this.opt.target){var c=b(this.opt.target);if(c.length==0){a.error.call(this,"target selector invalid or missing!");}var f=e;if(!d||f===undefined){f=this.opt.targetText;}else{if(this.opt.targetType=="hint"){f=(f===null&&this.opt.cancel)?this.opt.cancelHint:this.opt.hints[Math.ceil(f-1)];}else{f=this.opt.precision?parseFloat(f).toFixed(1):parseInt(f,10);}}if(this.opt.targetFormat.indexOf("{score}")<0){a.error.call(this,'template "{score}" missing!');}if(e!==null){f=this.opt.targetFormat.toString().replace("{score}",f);}if(c.is(":input")){c.val(f);}else{c.html(f);}}},showHalf:function(d){var c=(d-Math.floor(d)).toFixed(1);if(c>0&&c<0.6){this.stars.eq(Math.ceil(d)-1).attr("src",this.opt.path+this.opt.starHalf);}},initialize:function(c){c=!c?0:a.between(c,0,this.opt.number);a.fill.call(this,c);if(c>0){if(this.opt.halfShow){a.roundStar.call(this,c);}this.score.val(c);}},unfixHint:function(){for(var c=0;c<this.opt.number;c++){this.stars.eq(c).attr("title",(c<this.opt.hints.length&&this.opt.hints[c]!==null)?this.opt.hints[c]:c);}b(this).data("readonly",false).css("cursor","pointer").removeAttr("title");this.score.attr("readonly","readonly");}};b.fn.raty=function(c){if(a[c]){return a[c].apply(this,Array.prototype.slice.call(arguments,1));}else{if(typeof c==="object"||!c){return a.init.apply(this,arguments);}else{b.error("Method "+c+" does not exist!");}}};b.fn.raty.defaults={cancel:false,cancelHint:"cancel this rating!",cancelOff:"cancel-off.png",cancelOn:"cancel-on.png",cancelPlace:"left",click:undefined,half:false,halfShow:true,hints:["bad","poor","regular","good","gorgeous"],iconRange:undefined,mouseover:undefined,noRatedMsg:"not rated yet",number:5,path:"img/",precision:false,round:{down:0.25,full:0.6,up:0.76},readOnly:false,score:undefined,scoreName:"score",single:false,size:16,space:true,starHalf:"star-half.png",starOff:"star-off.png",starOn:"star-on.png",target:undefined,targetFormat:"{score}",targetKeep:false,targetText:"",targetType:"hint",width:undefined};})(jQuery);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//









