import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

export default function SendRequest(props) {
  function closeModal() {
    props.setIsOpen(false);
  }

  return (
    <>
      <Transition appear show={props.isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Request a Review
                  </Dialog.Title>
                  <div className="mt-5 flex flex-col gap-6">
                    <div className="flex gap-5 items-center">
                      <span className="text-gray-500">Customer Name:</span>
                      <input
                        type="text"
                        placeholder="Enter Customer's Name"
                        className="border pl-2 text-sm py-2 rounded-md"
                      />
                    </div>
                    <div className="flex gap-5 items-center">
                      <span className="text-gray-500">Customer Email:</span>
                      <input
                        type="text"
                        placeholder="Enter Customer's Email"
                        className="border pl-2 text-sm py-2 rounded-md"
                      />
                    </div>
                    <div className="flex gap-5 items-center">
                      <span className="text-gray-500">Product Name:</span>
                      <input
                        type="text"
                        placeholder="Enter Product's Name"
                        className="border pl-2 text-sm py-2 rounded-md"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-full border border-transparent bg-[#FF4495] px-6 py-2 text-sm font-medium text-white hover:bg-opacity-70 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Send
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
