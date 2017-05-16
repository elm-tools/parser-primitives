/*

import Elm.Kernel.Utils exposing (chr)

*/


// STRINGS

var _ParserPrimitives_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var bigLength = bigString.length - offset;

	if (bigLength < smallLength)
	{
		return _ParserPrimitives_tuple3(-1, row, col);
	}

	for (var i = 0; i < smallLength; i++)
	{
		var char = smallString[i];

		if (char !== bigString[offset + i])
		{
			return _ParserPrimitives_tuple3(-1, row, col);
		}

		// if it is a two word character
		if ((bigString.charCodeAt(offset) & 0xF800) === 0xD800)
		{
			i++
			if (smallString[i] !== bigString[offset + i])
			{
				return _ParserPrimitives_tuple3(-1, row, col);
			}
			col++;
			continue;
		}

		// if it is a newline
		if (char === '\n')
		{
			row++;
			col = 1;
			continue;
		}

		// if it is a one word character
		col++
	}

	return _ParserPrimitives_tuple3(offset + smallLength, row, col);
});

function _ParserPrimitives_tuple3(a, b, c)
{
	return { ctor: '_Tuple3', _0: a, _1: b, _2: c };
}


// CHARS

var _ParserPrimitives_isSubChar = F3(function(predicate, offset, string)
{
	if (offset >= string.length)
	{
		return -1;
	}

	if ((string.charCodeAt(offset) & 0xF800) === 0xD800)
	{
		return predicate(__Utils_chr(string.substr(offset, 2)))
			? offset + 2
			: -1;
	}

	var char = string[offset];

	return predicate(__Utils_chr(char))
		? ((char === '\n') ? -2 : (offset + 1))
		: -1;
});


// FIND STRING

var _ParserPrimitives_findSubString = F6(function(before, smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);

	if (newOffset === -1)
	{
		return _ParserPrimitives_tuple3(-1, row, col);
	}

	var scanTarget = before ? newOffset	: newOffset + smallString.length;

	while (offset < scanTarget)
	{
		var char = bigString[offset];

		if (char === '\n')
		{
			offset++;
			row++;
			col = 1;
			continue;
		}

		if ((bigString.charCodeAt(offset) & 0xF800) === 0xD800)
		{
			offset += 2;
			col++;
			continue;
		}

		offset++;
		col++;
	}

	return _ParserPrimitives_tuple3(offset, row, col);
});
