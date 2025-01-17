function CategoriesList() {
    const categoryList = ["Contracts", "Torts", "Family Law", "Property Law", "Labour Law", "Consumer Protection", "Wills & Estates", "Personal Injury", "Dispute Resolution", "Civil Rights"]

    return (
        <aside id="CL-1" className="bg-purple-500 text-white w-full rounded-md shadow-xl m-1">
            <ul id="CL-2" className="space-y-1">
                {categoryList.map((category, index) => (
                    <li key={index} id="CL-3" className="text-lg md:font-bold md:hover:underline md:p-3 p-1 m-2">
                    {category}
                </li>
                ))}
            </ul>
        </aside>
    )
}

export default CategoriesList;