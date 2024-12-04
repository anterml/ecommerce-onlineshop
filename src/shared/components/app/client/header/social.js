import React from "react"
import styled from "styled-components"
import Icon from "globalComponents/icons/svg"
import NoIndex from "globalComponents/noindex"

const data = {
  vkontakte: "вконтакт",
  twitter: "твиттер",
  facebook: "фейсбук",
  odnoklassniki: "одноклассники",
  google: "гугл+",
  instagram: "инстаграм",
}

const SocialLinks = () => (
  <NoIndex>
    <Text>Войти:</Text>
    {Object.keys(data).map(name => (
      <Link
        href={`/api/auth/${name}`}
        title={data[name]}
        data-name={name}
        rel="nofollow noopener"
        key={name}
      >
        <Icon name={name} />
      </Link>
    ))}
  </NoIndex>
)

export default SocialLinks

const Text = styled.span`
  color: #b3b3b3;
  vertical-align: middle;
  margin-right: 10px;
`

const Link = styled.a`
  display: inline-block;
  margin-left: 5px;
  width: 26px;
  height: 26px;

  &[data-name="facebook"] {
    color: #3b5998;
  }

  &[data-name="twitter"] {
    color: #55acee;
  }

  &[data-name="vkontakte"] {
    color: #4d76a1;
  }

  &[data-name="odnoklassniki"] {
    color: #ee8208;
  }

  &[data-name="google"] {
    color: #db4437;
  }

  &[data-name="instagram"] {
    color: #555;
  }

  &:hover {
    color: #bd3957;
  }
`
