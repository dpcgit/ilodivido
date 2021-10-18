import React from 'react';
import { useSelector } from 'react-redux';
import { Button} from 'antd'
import { useDispatch} from 'react-redux';
import { addToCart, removeFromCart } from '../App/AppSlice'

export default function Tool() {
    const selected_tool = useSelector((state)=>state.app.selected_tool)
    const dispatch = useDispatch();

    function handleClick(e){
      dispatch(addToCart({tool:selected_tool}))
      console.log('Tool added to cart')
    }

    function handleRemoveFromCart(e){
      dispatch(removeFromCart({tool:selected_tool}))
      console.log('Remove tool from cart')
    }
    return(
      <div>
            <p>{selected_tool.name}</p>
            <img src={selected_tool.pictures[0]} name={selected_tool.name} width="400" height="400" alt="Tool"/>
            <Button onClick={handleClick}>Add to cart</Button>
            <Button onClick={handleRemoveFromCart}>Remove from cart</Button>
            <p>jeje</p>
      </div>

  );
}
