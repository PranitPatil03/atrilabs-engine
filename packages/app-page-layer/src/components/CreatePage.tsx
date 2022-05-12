import React, { useCallback, useState } from "react";
import {
  amber300,
  Dropdown,
  gray300,
  gray500,
  gray700,
  gray800,
  gray900,
  h1Heading,
  h4Heading,
  Input,
  smallText,
} from "@atrilabs/design-system";
import { LinkIcon } from "../icons/LinkIcon";
import { Cross } from "../icons/Cross";
import { PageTableData } from "../hooks/usePageTableData";
import { useCreatePage } from "../hooks/useCreatePage";

const styles: { [key: string]: React.CSSProperties } = {
  createPage: {
    position: "absolute",
    left: "100%",
    top: 0,
    width: "15rem",
    background: gray700,
    borderLeft: `1px solid ${gray800}`,
    display: "flex",
    flexDirection: "column",
  },
  createPageHeader: {
    display: "flex",
    padding: `0.5rem 1rem`,
    justifyContent: "space-between",
    borderBottom: `1px solid ${gray800}`,
    paddingBottom: "0.5rem",
  },
  pageContHeaderH4: {
    ...h1Heading,
    color: gray300,
    margin: 0,
  },
  iconsSpan: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    width: "1.3rem",
    height: "100% !important",
  },
  createPageFormField: {
    display: "flex",
    justifyContent: "space-between",
    ...smallText,
    color: gray300,
    alignItems: "center",
    padding: `1rem 1rem 0 1rem`,
  },
  slugContainer: {
    padding: `1rem 1rem 0 1rem`,
  },
  slugContent: {
    display: "flex",
    background: gray500,
    alignItems: "center",
    ...smallText,
    color: gray300,
    borderRadius: "2px",
  },
};

export type CreatePageProps = {
  close: () => void;
  data: PageTableData;
};

export const CreatePage: React.FC<CreatePageProps> = React.memo((props) => {
  const [folders] = useState<string[]>(
    props.data.map((d) => {
      return d.folder.name;
    })
  );
  const [selectedFolder, setSelectedFolder] = useState<
    PageTableData["0"]["folder"]
  >(props.data[0].folder);
  const onSelect = useCallback(
    (_option: string, index: number) => {
      setSelectedFolder(props.data[index].folder);
    },
    [props, setSelectedFolder]
  );
  const [pageName, setPageName] = useState<string>("");
  const onPageNameChange = useCallback((value: string) => {
    setPageName(value);
  }, []);
  const createPage = useCreatePage();
  const onCreateClick = useCallback(() => {
    createPage(
      pageName,
      selectedFolder.id,
      () => {},
      () => {}
    );
    props.close();
  }, [props, selectedFolder, pageName, createPage]);
  return (
    <div style={styles.createPage}>
      <div style={styles.createPageHeader}>
        <h4 style={styles.pageContHeaderH4}>Create new page</h4>
        <span style={styles.iconsSpan} onClick={props.close}>
          <Cross />
        </span>
      </div>
      <div style={styles.createPageFormField}>
        <span>Folder</span>
        <Dropdown options={folders} onSelect={onSelect} />
      </div>
      <div style={styles.createPageFormField}>
        <span>Page</span>
        <Input onChange={onPageNameChange} />
      </div>
      <div style={styles.slugContainer}>
        <div style={styles.slugContent}>
          <div
            style={{
              padding: "0.5rem",
              display: "flex",
              alignItems: "center",
            }}
          >
            <LinkIcon />
          </div>
          <div>{`/${selectedFolder.name.replace("/", "")}`}</div>
        </div>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", padding: "1rem" }}
      >
        <button
          style={{
            borderRadius: "4px",
            backgroundColor: amber300,
            ...h4Heading,
            color: gray900,
            border: "none",
            padding: "0.2rem 0.6rem 0.2rem 0.6rem",
          }}
          onClick={onCreateClick}
        >
          Create
        </button>
      </div>
    </div>
  );
});
