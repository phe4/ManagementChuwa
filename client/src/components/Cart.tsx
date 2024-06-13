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
      <Dialog open={isOpen} onClose={() => {setIsOpen(false)}} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex w-screen justify-end pt-1">
          <DialogPanel className="bg-white md:w-5/12 w-full h-4/5 max-w-4xl">
            test
          </DialogPanel>
        </div>
      </Dialog>
    </Transition>
  )
});

export default Cart;
