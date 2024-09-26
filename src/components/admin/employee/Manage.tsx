function Manage(props) {
    const { queryParameterInitial,url } = props;
    const dispatch = useDispatch();
    useEffect(() => {
        
        dispatch(createQueryParameter(queryParameterInitial))

    }, [dispatch])
    return (
        <div className="container-body-admin">
            <TitleActionAdmin />
            <SectionActionAdmin  itemAction={sectionActions}/>
            <SearchContentAdmin  itemSearch={optionSearch}/>
            <TableManage  url={url} TBodyTable={TBodyTable} nameColumn={columnUser} />
        </div>
    )
}
export default memo(Manage);