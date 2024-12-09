
export function UserWidget ({user}) {
    return(
        <>
        <div className="card bg-neutral text-neutral-content w-fit">
            <div className="card-body flex-col gap-5 justify-center align-center">
                <div className="avatar placeholder">
                    <div className="bg-primary text-primary-content w-16 rounded-full">
                        <span className="text-3xl">{user.name[0]}</span>
                    </div>
                </div>
                <h2 className="card-title text-neutral-content text-center">{user.name}</h2>
            </div>
        </div>
        </>
    )
}