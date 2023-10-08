import React from 'react';
import Button from '@mui/material/Button';
type MyComponentProps = {
  add: (element: Element) => void;
  remove: (element: Element) => void;
  element: any;
  isAdded: boolean;
};

const MyComponent: React.FC<MyComponentProps> = ({
  add,
  remove,
  element,
  isAdded, // New prop to represent whether the product is already added or not
}) => {
  return (
    <div className='buttonContainer'>
      {isAdded ? ( // Check the value of isAdded to display the appropriate button
        <Button
          className='removeButton'
          onClick={() => remove(element)}
          variant='contained'
          color='error'
        >
          Del
        </Button>
      ) : (
        <Button
          className='addButton'
          onClick={() => add(element)}
          variant='contained'
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default MyComponent;
