import { Dialog, DialogPanel, Transition } from '@headlessui/react';
import { useState, useImperativeHandle, forwardRef } from 'react';

export interface CMethods {
  toggle: () => void
}

const Cart = forwardRef<CMethods>(function Cart(_props, ref) {
  const [isOpen, setIsOpen] = useState(false);

  useImperativeHandle(ref, () => {
    return {toggle};
  });

  const toggle = (): void => {
    setIsOpen(val => !val);
  };

  return (
    <Transition 
      show={isOpen}
      enter="duration-200 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="duration-300 ease-out"
      leaveFrom="opacity-100"
      leaveTo="opacity-0">
      <Dialog open={isOpen} onClose={toggle} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true"/>
        <div className="fixed inset-0 w-screen pt-1">
          <DialogPanel
              className="bg-white w-full absolute inset-x-0 top-24 bottom-32 md:top-0 md:right-0
              md:left-auto md:bottom-auto md:w-5/12 md:h-4/5 max-w-4xl flex flex-col">
            <header className="h-16 md:h-20 bg-blue flex justify-between items-center px-4">
              <h1 className="text-2xl md:text-3xl font-bold text-white">Cart <span>(3)</span></h1>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                   stroke="currentColor" className="size-6 cursor-pointer text-white" onClick={toggle}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"/>
              </svg>
            </header>
            <section className="flex-1 overflow-y-auto scroll-smooth">
              <ul className="px-5 pt-10">
                <li className="flex mb-7">
                  <img src="" alt="" className="w-28 h-28"/>
                  <div className="ml-3 flex-1 flex flex-col justify-between">
                    <div className="md:flex md:justify-between">
                      <h2 className="text-xl font-bold text-black-common">Meta Quest VR</h2>
                      <h2 className="text-xl font-semibold text-blue">$299.00</h2>
                    </div>
                    <div className="flex justify-between">
                      <div className="border border-solid border-gray-border rounded">
                        <span
                            className="inline-block w-7 h-7 text-center leading-7 cursor-pointer text-sm text-gray">-</span>
                        <input
                            className="w-7 h-7 focus:outline-0 text-sm font-medium text-black-common text-center border-x border-solid border-gray-border"/>
                        <span
                            className="inline-block w-7 h-7 text-center leading-7 cursor-pointer text-sm text-gray">+</span>
                      </div>
                      <a className="text-base font-medium text-gray cursor-pointer underline">Remove</a>
                    </div>
                  </div>
                </li>
              </ul>
              <section className="px-5">
                <p className="text-sm font-semibold text-gray">Apply Discount Code</p>
                <div className="flex mt-2.5">
                  <input className="border border-solid border-gray-border rounded focus:outline-0 h-11 flex-1 px-3 text-gray-light"/>
                  <button className="bg-blue text-white text-sm font-bold px-5 ml-4 rounded">Apply</button>
                </div>
              </section>
              <div className="w-full h-px bg-gray-border mt-10"></div>
              <section className="p-5">
                <ul className="text-base font-semibold text-black-common">
                  <li className="flex mb-4 justify-between"><span>Subtotal</span><span>$499.00</span></li>
                  <li className="flex mb-4 justify-between"><span>Tax</span><span>$49.00</span></li>
                  <li className="flex mb-4 justify-between"><span>Discount</span><span>-$20.00</span></li>
                  <li className="flex mb-4 justify-between"><span>Estimated total</span><span>$429.10</span></li>
                </ul>
                <button className="w-full bg-blue text-white text-sm font-bold rounded h-11">Continue to checkout</button>
              </section>
            </section>
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  )
});

export default Cart;
