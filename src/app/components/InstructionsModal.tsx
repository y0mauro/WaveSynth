import React from "react";

interface Instruction {
  title: string;
  content: string;
}

const instructions: Instruction[] = [
  {
    title: "General Information:",
    content:
      "Please keep in mind that the range is limited. To have the best experience, stay in the detection range of the controller.",
  },
  {
    title: "Volume Controls:",
    content:
      "Decide with which hand you want to use the virtual DJ. If you want to use your left hand, then form a fist and extend your thumb. Your thumb should point to the right and your palm downward. Moving your hand upwards increases the volume. Moving your hand downwards decreases the volume.",
  },
  {
    title: "Filter Controls:",
    content:
      "Hold your hand above the controller and hold an imaginary bottle horizontally in your hand. Moving your hand to the right increases the value of the filter. Moving your hand to the left decreases the value of the filter.",
  },
  {
    title: "Changing Filters:",
    content:
      "To change the filter you should hold your fully opened hand above the controller. Your palm should now face the controller. Moving the hand upwards or downwards can change them. The levels of filter control are based on the structure of the Studio page.",
  },
];

interface InstructionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InstructionsModal: React.FC<InstructionsModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle max-w-5xl sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-title"
                >
                  Instructions for Use
                </h3>

                <div className="mt-2">
                  <div className="list-disc flex  gap-2  list-inside text-sm text-gray-700">
                    {instructions.map((instruction, index) => (
                      <div key={index} className="p-5 m-0 w-full">
                        <h4 className="font-bold">{instruction.title}</h4>
                        <p>{instruction.content}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              onClick={onClose}
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-900 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstructionsModal;
