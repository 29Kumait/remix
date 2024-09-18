import { useLoaderData, useFetcher } from "@remix-run/react";
import { BackgroundMultipleChoice } from "~/components/Style";

interface LoaderData {
  selectedOption: string;
  exercise: {
    id: string;
    title: string;
    description?: string;
    hint?: string;
    answers: Array<{ id: string; answer: string }>;
  };
}

export default function MultipleChoiceExercise() {
  const { exercise, selectedOption: initialSelectedOption } =
    useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  let selectedOption = initialSelectedOption;
  if (fetcher.formData?.has("radioOption")) {
    selectedOption = fetcher.formData.get("radioOption") as string;
  }
  const randomColorClass = getRandomColor();

  return (
    <BackgroundMultipleChoice>
      <div className="p-8 lg:p-16 space-y-8 max-w-3xl mx-auto">
        {/* Title */}
        <h2 className="responsive-title text-left text-4xl font-bold text-white mb-4">
          {exercise.title}
        </h2>

        {/* Description */}
        <div className="text-lg lg:text-xl text-gray-300 p-4 rounded-lg shadow-lg bg-gray-800 bg-opacity-70 text-left prose prose-img:max-w-full prose-img:h-auto prose-img:mix-blend-overlay shadow-zinc-950">
          <div
            dangerouslySetInnerHTML={{ __html: exercise.description || "" }}
          />
        </div>

        {/* Form */}
        <fetcher.Form method="post" className="space-y-6">
          <fieldset className="space-y-4">
            <div className="space-y-4 p-11">
              <legend className="text-2xl font-semibold text-white text-left mb-2">
                Pick one option:
              </legend>

              {exercise.answers.map((answer) => (
                <label
                  key={answer.id}
                  className="form-field flex items-center space-x-3 animate-scale bg-gray-800 bg-opacity-60 backdrop-blur-lg rounded-lg px-6 py-3 transition duration-300 ease-in-out hover:bg-opacity-80 max-w-full"
                >
                  <input
                    type="radio"
                    name="radioOption"
                    value={answer.answer}
                    defaultChecked={selectedOption === answer.answer}
                    className="hidden"
                    onChange={(e) => fetcher.submit(e.target.form)}
                  />
                  {/* SVG Radio Button */}
                  <div className="w-5 h-5 flex-shrink-0">
                    {selectedOption === answer.answer ? (
                      <svg
                        className={`w-5 h-5 ${randomColorClass}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="10" cy="10" r="10" />
                      </svg>
                    )}
                  </div>
                  <span className="text-white">{answer.answer}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </fetcher.Form>

        {/* Hint */}
        {exercise.hint && (
          <p
            className="bg-gradient-to-r from-gray-700 via-gray-600 to-gray-500 text-white text-left p-4 rounded-lg shadow-lg animate-pulse"
            dangerouslySetInnerHTML={{ __html: exercise.hint }}
          />
        )}
      </div>
    </BackgroundMultipleChoice>
  );
}

const colors = [
  "text-customBlue",
  "text-customPink",
  "text-customGreen",
  "text-customTeal",
  "customBlueGreen",
];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
