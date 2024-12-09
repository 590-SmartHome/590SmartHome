
export function UserWidget ({user}) {
    return(
        <>
        <div className="card bg-primary text-primary-content w-96">
            <div className="card-body">
                <h2 className="card-title">{user.first_name}</h2>
            </div>
        </div>
        </>
    )
}