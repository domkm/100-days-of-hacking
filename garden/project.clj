(defproject eden "0.0.0"
  :description "Experiments with Garden (https://github.com/noprompt/garden)"
  :url "https://github.com/DomKM/100-days-of-hacking"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [garden "1.1.4"]]
  :plugins [[lein-garden "0.1.1"]]
  :garden {:builds [{:id "cube"
                     :stylesheet eden.cube/styles
                     :compiler {:output-to "resources/public/cube.css"
                                :pretty-print? true
                                :vendors ["o" "moz" "webkit"]}}]})
