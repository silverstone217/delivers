import { getUser } from "@/actions/authAction";
import { getDeliveryCompany } from "@/actions/services";
import React from "react";

async function page() {
  const user = await getUser();

  if (!user) return null;

  const companies = await getDeliveryCompany();

  //   NO companies found

  if (!companies || companies.length < 1) {
    return null;
  }

  // COMPANIES EXIST

  const company = companies[0];

  return (
    <div>
      <h3>{company.name}</h3>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates
        earum odio reiciendis similique accusantium modi, dolores consectetur
        aperiam voluptate? Doloribus eum ad voluptatibus sapiente? Ab nostrum
        deleniti possimus culpa corporis. Beatae quam quaerat reprehenderit
        quidem? Ut eum voluptatibus exercitationem soluta necessitatibus nobis
        veniam suscipit, amet excepturi magni earum quibusdam, sunt cum,
        deleniti eius? Earum officiis fugit soluta aperiam nostrum. Consectetur!
        Nam, magni dolor, consequatur maxime quod neque animi nihil, recusandae
        adipisci iusto incidunt! Quia nulla maxime aliquid odit, soluta
        voluptatibus autem placeat, excepturi doloribus inventore, commodi omnis
        obcaecati consequatur quis. Placeat debitis dolor reprehenderit nisi
        fugit magnam natus ipsa culpa tenetur maiores quos quae ad, eligendi,
        illo repudiandae consequatur perferendis aliquam error minus aliquid
        exercitationem ea voluptas. Reiciendis, facilis aspernatur. Consequuntur
        delectus explicabo, sunt expedita perspiciatis voluptas necessitatibus
        eveniet. Autem, laboriosam dolore unde totam dolorum vel soluta
        laudantium? Inventore possimus iure, accusamus vitae quidem dolor
        cupiditate consequatur et modi ratione. Temporibus, est nobis doloremque
        ipsum laboriosam ratione aut illo quas incidunt, neque quod dignissimos
        vel quis maxime, commodi recusandae id esse excepturi adipisci nesciunt
        iusto! Exercitationem a itaque vitae atque. Impedit, totam suscipit
        inventore, provident dolores ullam cupiditate beatae modi maxime
        laudantium, explicabo numquam nostrum distinctio assumenda deserunt
        ipsam aut quia molestiae delectus voluptas perspiciatis? Eaque minima
        unde ratione voluptatum. Excepturi ab quisquam qui illo unde voluptate
        ad! Quas maiores deleniti magnam id optio corrupti debitis! Iste odio
        ullam exercitationem veritatis labore ad eos enim voluptatem corporis,
        provident cupiditate! Deleniti? Mollitia dolor sapiente numquam, quos
        veniam reprehenderit ratione, incidunt, quasi nemo accusantium iure?
        Exercitationem nostrum quis, aspernatur deleniti quae quisquam odio,
        omnis voluptatem et dolor eos ipsa libero velit facere? Saepe, delectus
        in! Necessitatibus cupiditate neque, omnis soluta, quam dolores ab illum
        consequuntur quisquam et quibusdam rerum ipsam eius. Illum cumque
        expedita amet aspernatur aliquid adipisci mollitia non nobis labore.
        Repellat, soluta doloremque placeat aliquid nostrum consectetur omnis
        saepe sequi in reiciendis culpa dolorum quia sed error asperiores eaque?
        Porro quos placeat iure cupiditate. Debitis suscipit mollitia pariatur
        sed corrupti? Eaque quas pariatur a consequuntur itaque eveniet
        veritatis, quaerat, commodi provident debitis sequi dolore culpa? Vero
        consequuntur labore velit error numquam! Corrupti itaque, quis illum
        suscipit inventore nisi ex impedit. Id nihil unde ipsam rerum ducimus,
        fugit repudiandae adipisci saepe, aspernatur atque dolorem a nulla
        labore laborum officiis numquam impedit omnis animi neque reiciendis
        consequatur quibusdam nemo quaerat? Quaerat, provident? Sequi eos
        exercitationem dignissimos nostrum blanditiis totam consequatur eum,
        reprehenderit facilis quisquam similique, dicta maiores, tenetur
        sapiente! Illo error nam, nemo modi magnam voluptatem sint, veniam
        pariatur architecto iure ipsum? Repellat deleniti magni aliquam sequi?
        Repellendus quisquam dicta nulla consectetur eveniet, eaque vero!
        Dolores nemo adipisci iure explicabo fuga doloribus consectetur,
        aspernatur reiciendis numquam illum. Perferendis sit vel ipsa optio?
        Sequi alias officia mollitia illo doloremque vel dolores omnis
        perspiciatis impedit optio ea eius quo et, odit iure earum harum iusto
        ducimus accusantium id porro facilis architecto qui. Dignissimos,
        quaerat! Saepe aspernatur rerum quaerat incidunt illo modi, nobis,
        dolore inventore officiis culpa eligendi odit fuga ullam sequi iste unde
        laboriosam ipsam doloribus voluptatibus cum voluptas? Porro aut totam
        iure perferendis. Debitis iure aliquid praesentium voluptas nobis
        asperiores consequuntur exercitationem aut deleniti! Eveniet sapiente
        quis iste praesentium autem quos error esse tempora sit molestiae earum,
        maxime vitae. Animi quam nam cumque? Tempora architecto unde vitae
        numquam asperiores impedit vel quisquam rerum mollitia, placeat eligendi
        veritatis quo! Dolorem itaque doloribus laborum ut dolor dolore, esse
        praesentium? Nobis eius rerum reiciendis in sunt! Vel temporibus
        cupiditate in accusantium provident rerum, facere quidem iusto
        architecto quo qui beatae mollitia. Ab veritatis temporibus quibusdam
        est fuga amet tempora labore molestias fugiat. Id mollitia commodi
        doloribus? Iusto suscipit nisi fugit est cupiditate recusandae porro
        pariatur velit consectetur. Dolor exercitationem cupiditate cum
        dignissimos, expedita perspiciatis harum explicabo doloremque, repellat
        optio saepe laudantium ipsa laborum magni nulla! Labore. Ullam cum
        exercitationem suscipit iste repudiandae sint dicta sit, corporis
        consequuntur nobis dolorem quis, reprehenderit voluptates dignissimos.
        Nemo voluptates iure necessitatibus minus iste architecto quo officia.
        Inventore commodi quod vel. Eaque, eum, in eligendi tenetur ex eius vel
        architecto repellendus aperiam eos blanditiis praesentium voluptates
        consequuntur, vitae ullam non? Necessitatibus architecto natus deleniti
        blanditiis nesciunt consequuntur quis doloribus placeat nihil. Sed id
        consequuntur aliquam quae aperiam architecto dolore doloremque ipsa
        corporis quod ratione hic illo est, voluptatem assumenda inventore eos
        sequi officiis cumque pariatur debitis tempore? Ut ab nemo dolorem.
        Mollitia nisi ex cum eos numquam doloremque, ipsa fugit harum id minima
        tenetur facere impedit sit accusamus enim laborum illo ducimus, autem
        dignissimos dolore iste quia. Ex nam fuga laborum. Nesciunt, dolor.
        Veritatis ea in commodi quasi cumque praesentium ab cupiditate! Nemo,
        eum dignissimos nisi sint praesentium, ab magni deleniti eligendi
        aliquam vel et facere commodi enim nam cupiditate quis! Corrupti
        distinctio placeat quo dignissimos provident laboriosam magni rem
        mollitia. Consectetur dicta veniam molestias. Incidunt enim, magni non,
        quae harum eligendi corrupti molestiae minus reiciendis adipisci eum
        laboriosam laborum voluptatem. Consequatur, fugit. Ipsa dolore ratione,
        sed saepe molestias commodi quisquam sint quod, esse quasi cum repellat
        corporis facilis magni ducimus. Mollitia voluptatem labore minima facere
        enim illum alias illo ad! Officia ipsam adipisci est, nam, quam quaerat
        asperiores fuga iusto delectus modi fugit laborum commodi libero dolor
        hic, sequi maxime eum reiciendis iste sunt labore a consequuntur ea?
        Explicabo, repudiandae! Itaque esse unde doloremque dicta tempore id
        architecto vero molestias, repellendus, neque quasi totam voluptates
        velit atque harum, aliquam hic? Aperiam temporibus veritatis earum?
        Illum suscipit recusandae nulla at praesentium? Quam quidem magnam
        deleniti reiciendis soluta ipsum, voluptates impedit corrupti rerum
        veniam modi assumenda nobis vitae itaque illo repellendus inventore?
        Quidem cupiditate aspernatur repellendus similique sapiente vel,
        deleniti iste provident? Beatae accusantium quia, itaque voluptate vero
        repellendus voluptas recusandae doloribus placeat dolore eos sint optio
        ullam obcaecati doloremque nesciunt? Reprehenderit sunt quidem assumenda
        provident placeat? Assumenda nesciunt vel doloribus optio! Eligendi,
        quasi? Aliquid harum molestiae, voluptas itaque quod excepturi eos totam
        assumenda voluptatem veniam voluptatum alias et distinctio, sequi, odit
        nemo dolores aliquam fuga aspernatur exercitationem sapiente
        consequuntur optio quisquam. Debitis ut non quos incidunt expedita velit
        architecto atque dolorum natus voluptatibus deleniti reprehenderit odit,
        sequi saepe voluptate blanditiis numquam maiores doloribus quas
        officiis. Suscipit amet assumenda rerum adipisci similique. Rem ea
        blanditiis inventore unde voluptatem molestiae nobis sed minima magnam
        placeat, voluptate sapiente dolore quam maxime vitae delectus
        exercitationem pariatur. Eum maxime odio nulla magni minus voluptatibus
        fugit nostrum. Blanditiis, odio nemo? Omnis recusandae ducimus aliquam
        sit, non quasi sed dolorem ad nam rerum optio illo inventore nulla,
        consequatur iste veritatis sint eos nemo quidem repudiandae
        reprehenderit ipsum? Quidem. Similique laudantium quod ratione iusto
        sapiente atque debitis tempora rem laborum voluptates natus nihil ex
        recusandae quisquam, nam labore animi. Commodi, cumque ipsum labore cum
        nobis minima ab adipisci reiciendis? Dolorem quae quos quasi velit eum
        at ab, iure quidem harum quis perferendis, obcaecati odio doloribus!
        Voluptatibus magni explicabo soluta ex sunt voluptatem vitae dicta
        voluptas? Iste, possimus laboriosam? Repellat. Laborum autem beatae eos
        officiis maiores vel, temporibus incidunt corporis mollitia quasi? Amet
        ipsam, ea mollitia sit, facere hic voluptate a labore totam nobis
        assumenda. Deleniti veniam atque eveniet dicta. Est dolorem, consectetur
        incidunt dignissimos doloribus architecto aperiam fugit illum ipsam
        soluta vitae id nobis debitis placeat hic molestiae deleniti eaque nemo
        aliquid deserunt quibusdam eveniet perspiciatis veritatis quos! Ipsum.
        Nisi inventore consectetur a! Unde eius sapiente molestias laboriosam
        laborum aspernatur. Aperiam recusandae asperiores, cum perferendis,
        fugiat dolore incidunt non ipsum laborum cupiditate necessitatibus nobis
        reiciendis, adipisci repellendus distinctio error? Hic, labore? Iusto
        voluptatibus architecto inventore consectetur alias nisi nemo asperiores
        labore! Voluptas perferendis rem sit quo, ipsa eos adipisci culpa
        placeat libero voluptatum quia cumque quidem reiciendis? Repudiandae,
        et! Animi ex excepturi deserunt maiores eius, pariatur omnis vitae, quia
        sunt voluptates reiciendis iste illo. Natus aliquid nobis atque, unde
        amet officia dolore nulla quas voluptas pariatur tempora aliquam culpa.
        Magnam hic tempora blanditiis ea eum eveniet! Quisquam quam sequi
        perferendis fugit ratione facilis unde dolores ullam dolorem ut
        accusamus fugiat voluptates ducimus non beatae assumenda hic, maiores
        aut odit? Quis expedita dolorem obcaecati quo delectus. Vitae alias
        ipsum dolore, velit nemo similique reiciendis vero nisi nulla saepe,
        dolores, eaque nostrum quod quas veritatis voluptates corrupti quaerat
        iure perferendis accusamus? Perspiciatis deserunt dicta doloribus, at
        nulla ad tempora explicabo possimus aspernatur aliquid, libero,
        quibusdam natus consequatur odit nam. Quisquam quidem placeat sapiente
        at magnam esse impedit repudiandae nam iusto ut! Cumque, dignissimos.
        Ipsum quam vel quisquam perspiciatis non? Alias est odit sapiente, quae
        molestias assumenda cupiditate? Ipsa voluptates blanditiis quasi,
        nesciunt aliquam mollitia commodi facere quas vel unde voluptatibus
        harum. Debitis odio repellat soluta sint aspernatur saepe ex beatae amet
        officia fugit, atque delectus cupiditate blanditiis ratione? Culpa, sit
        voluptates, est provident, quisquam in sequi vero assumenda quo voluptas
        saepe. Eius accusamus recusandae adipisci eveniet maiores beatae
        mollitia reiciendis consequuntur laborum tempore nulla, at consectetur
        sequi odit eos soluta reprehenderit unde illo commodi dolores aliquam
        quaerat! Sequi minima ab nam! Quisquam autem voluptatum soluta unde
        quibusdam similique rem itaque vitae nobis? Perferendis amet aspernatur
        molestiae, ex incidunt culpa assumenda veniam magnam nemo, fugit cumque
        ullam excepturi facere minima facilis animi!
      </p>
    </div>
  );
}

export default page;
