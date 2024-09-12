import { useLoaderData, Form ,  } from "@remix-run/react";
import {ActionFunction , json , LoaderFunction , redirect} from "@remix-run/node";
import { getSession, commitSession } from "~/sessions.server";

export const loader : LoaderFunction = async ({ request } : { request : Request}) => {
    const session = await getSession(request.headers.get("Cookie"));
    const selectedValue = session.get("selectedKey") || null;
    return json({ selectedValue });
};

interface LoaderData {
    selectedValue: string;
}

export const action : ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const selectedValueUser = formData.get("selectedKeyUser");

    const session = await getSession(request.headers.get("Cookie"));
    session.set("selectedKey", selectedValueUser);

    return redirect("/", {
        headers: {
            "Set-Cookie": await commitSession(session),
        },
    });
};

export default function Index() {
    const { selectedValue } = useLoaderData<LoaderData>();

    return (
        <Form method="post">
            <ul>
                <li>
                    <label>
                        <input
                            type="radio"
                            name="selectedKeyUser"
                            value="value"
                            defaultChecked={selectedValue === "value"}
                        />
                        Option 1
                    </label>
                </li>

                <li>
                    <label>
                        <input
                            type="radio"
                            name="selectedKeyUser"
                            value="value2"
                            defaultChecked={selectedValue === "value2"}
                        />
                        Option 2
                    </label>
                </li>
            </ul>
            <button type="submit">Save</button>
        </Form>
    );
}


// import type {MetaFunction} from "@remix-run/node";
// import Answer from "~/routes/answer.$answerId";
//
// export const meta: MetaFunction = () => {
//     return [
//         {title: "New Remix App"} ,
//         {name: "description" , content: "Welcome to Remix!"} ,
//     ];
// };
//
//
// export default function Index() {
//     return (
//         <div className="font-sans p-4">
//             <h1 className="text-3xl"></h1>
//             <ul className="list-disc mt-4 pl-6 space-y-2">
//                 <li>
//                     <Answer/>
//                 </li>
//             </ul>
//         </div>
//     );
// }
//
//



