var MAPPINGS = [];
var index = 0;
function backtrack (item, reference, key, index, hasParent) {
      if (item && typeof item === 'object' && !Array.isArray(item)) {
        return divide(Object.keys(item), item, key, index, true);
      }
      
      else if (item && typeof item === 'object' && Array.isArray(item) && item.length > 2) {
        let high = item.length;
        let mid = Math.ceil(high/2);
        let valueLeft = item.slice(0, mid);
        let valueRight = item.slice(mid);
        let acc = index - valueRight.length;
        let left = divide(valueLeft, reference, key, (hasParent ? index: parseInt(`${acc}`)), hasParent);
        let right = divide(valueRight, reference, key, (hasParent ? index: parseInt(index)), hasParent);
        return left + right;
      }
      
      else if (item && typeof item === 'object' && Array.isArray(item) && item.length === 2) {
        let _left = item.slice(0,1);
        let _right = item.slice(1,2);
        _left = typeof _left[0] === 'object' && !Array.isArray(_left[0]) ? _left[0] : _left;
        _right = typeof _right[0] === 'object' && !Array.isArray(_right[0]) ? _right[0] : _right;
        return divide(_left, reference, key, (hasParent ? index : index-1)) + divide(_right, reference, key, (hasParent ? index: index));
      }
      
      else if (item && typeof item === 'object' && Array.isArray(item) && item.length === 1) { 
        let _item = reference[item[0]]; 
        let _key = typeof reference[item[0]] === 'object' && Array.isArray(reference[item[0]]) ? item[0]+'[0].' : (typeof item[0] === 'string' ? item[0]+'.' : '');
        _item = (typeof item[0] === 'object' && !Array.isArray(item[0])) ? item[0] : _item;
        let _calculatedKey = (key+_key);
        /*
        Regex to find the last occurrence of "[0]" in a string
        \[0\] (?!.*\[0\])
        concept:
        Negative lookahead: (?!...)
        */
        _calculatedKey = index > 0 ? _calculatedKey.replace(/\[0\]+(?!.*\[0\])/g, () => { return `[${index-1}]` }) : _calculatedKey;
        return divide(_item, _item, _calculatedKey, Array.isArray(reference[item[0]]) ? reference[item[0]].length : null);
      }

      else if(item && (typeof item !== 'object' || typeof item === 'number') && item === 'STATUS') { 
        let _ID_;
        const _key_ = key.substr(0, key.length-1);
        MAPPINGS[index++] = {path:_key_};
        return '';
      }
    }
    
    divide(content, content, '', '')
