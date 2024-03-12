import {Outlet, useLoaderData, Form, redirect, NavLink, useNavigation, useSubmit} from "react-router-dom";
import {getContacts, createContact} from "../contacts.js";
import {useEffect} from "react";

export async function loader({request}){
    const url = new URL(request.url);
    const query = url.searchParams.get("query");
    const contacts = await getContacts(query);
    return { contacts, query };
}

export async function action(){
    const contact = await createContact();
    return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root(){
    const { contacts, query } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching = navigation.location && new URLSearchParams(navigation.location.search).has("query");

    useEffect(() => {
        document.getElementById("q").value = query;
    }, [query]);

    return (
        <>
            <div id="sidebar">
                <h1>Contacts</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search contacts"
                            placeholder="Search"
                            type="search"
                            name="query"
                            defaultValue={query}
                            onChange={(event)=>{
                                const isFirstSearch = query === null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch
                                });
                            }}
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        />
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    { contacts ?
                        (
                            <ul>
                                { contacts.map((contact, index)=> (
                                    <li key={index}>
                                        <NavLink
                                            to={`/contacts/${contact.id}`}
                                            className={({isActive, isPending})=>
                                                isActive
                                                    ? "active"
                                                    : isPending
                                                        ? "pending"
                                                        : ""
                                            }
                                        >
                                            {contact.first || contact.last ? (
                                                <>
                                                    {contact.first} {contact.last}
                                                </>
                                            ) : (
                                                <i>No Name</i>
                                            )}{" "}
                                            {contact.favorite && <span>★</span>}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>
                            <i>No contacts</i>
                            </p>
                        )
                    }
                </nav>
            </div>
            <div
                id="detail"
                className={
                    navigation.state === "loading" ? "loading" : ""
                }
            >
                <Outlet />
            </div>
        </>
    );
}