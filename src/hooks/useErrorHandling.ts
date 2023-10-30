// hooks/useErrorHandling.ts

/*****************************************************************************************
 * If you're going to try the flag trigger code, you need to replace everything
 * below with the code from 
 * "Handling API Migrations Like a Pro - Immediate Resolution With Flag Triggers", Step 3.
 *****************************************************************************************/
import { useState } from 'react';
import { useShoppingCart } from 'use-shopping-cart';

const useErrorHandling = () => {
  const triggerURL = 'https://app.launchdarkly.com/webhook/triggers/653fb0f393bb1311f9bdec09/7557f59f-11a4-402b-9dfe-1da0bd2b2f1a';
  const [errorState, setErrorState] = useState(false);

  const { clearCart } = useShoppingCart();

  const Trigger = async () => {
    try {
      const response = await fetch(
        triggerURL,
        {
          method: "POST",
          body: JSON.stringify({
            eventName: "There was an error with the API",
          }),
        }
      );
      return response.status;
    } catch (error) {
      console.log("the fetch did not work");
    }
  };

  const errorTesting = async () => {
    try {
      const response = await fetch("/api/checkout", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const jsonData = await response.json();
      if (jsonData == "the API is unreachable") {
        setErrorState(true);
         clearCart()
         Trigger()
        return 502;
      } else {
        setErrorState(false);
      }
    } catch (e) {
      console.log("is it running?");
      console.log(e)
    }
  };

  return { errorState, setErrorState, errorTesting };
};

export default useErrorHandling;