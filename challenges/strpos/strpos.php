<?php

function my_strpos($str, $input, $pos = -1)
{
 	$strArr     = str_split($str);
 	$inputArr   = str_split($input);
 	$inputCount = count( $inputArr );
 
 	if ($pos > 0){
 		return $strArr[$pos-1] === $input; 
 	}
	if (count( $inputArr ) === 1){
		foreach ($strArr as $key => $val) {
			if ($val === $input){
				return $key;
				break;
			}
		}
	}else if ($inputCount > 1){
		$firstMatchPos = -1;
		$matchPos      = -1;
		$i             =  0;
		
		foreach ($inputArr as $key => $val) {
			$inputKey = $key;
			$inputVal = $val;
			$match    = false;
			foreach ($strArr as $k => $v) {
				if ($inputVal === $v && $matchPos < 0 ){
					$match         = true;
					$matchPos      = $k;
					$firstMatchPos = $k;
					$i++;
					break;
				}else if ($inputVal === $v && ($matchPos > -1 && $k === $matchPos + 1)){
					$match    = true;
					$matchPos = $k;
					$i++;
					break;
				}
			}
			if ($match === false){
				return false;
			}
		}
		if ($i === $inputCount){
			return $firstMatchPos;
		}
	}
 	return false;
}

$alphabet = 'abcdefghijklmnopqrstuvwxyz';

# Should print "17"
print(my_strpos($alphabet, 'r') . "\n");

# Should print "6"
print(my_strpos($alphabet, 'ghi') . "\n");

# Should print "bool(false)"
var_dump(my_strpos($alphabet, 'u', 22));

# Should print "bool(false)"
var_dump(my_strpos($alphabet, 'A'));

# Should print "bool(false)"
var_dump(my_strpos($alphabet, 'ghk'));

?>